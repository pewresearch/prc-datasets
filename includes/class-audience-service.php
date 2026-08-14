<?php
/**
 * Dataset downloader audience build / list / delete service.
 *
 * Shared by WP-CLI and REST. Persists email lists in wp_options; does not
 * create newsletter drafts (callers may do that after build()).
 *
 * @package PRC\Platform\Datasets
 */

declare(strict_types=1);

namespace PRC\Platform\Datasets;

use PRC\Platform\CLI_Audience_Verification;
use WP_Error;

require_once dirname( __DIR__, 2 ) . '/prc-firebase/includes/trait-cli-audience-verification.php';

/**
 * Builds and manages system audiences for dataset downloaders.
 */
class Audience_Service {
	use CLI_Audience_Verification;

	const AUDIENCE_OPTION_PREFIX = 'prc_email_audience_dataset_';
	const FIREBASE_ENDPOINT_KEY  = 'dataset';

	/**
	 * Option key for a dataset audience list.
	 *
	 * @param int    $dataset_id   Dataset post ID.
	 * @param string $verification verified|unverified|all
	 */
	public static function option_key( int $dataset_id, string $verification ): string {
		return self::AUDIENCE_OPTION_PREFIX . $dataset_id . '_' . $verification;
	}

	/**
	 * List audience snapshots for a dataset (meta only, no email arrays).
	 *
	 * @param int $dataset_id Dataset post ID.
	 * @return array<int, array<string, mixed>>
	 */
	public static function list_for_dataset( int $dataset_id ): array {
		$audiences = array();
		foreach ( array( 'verified', 'unverified', 'all' ) as $mode ) {
			$key  = self::option_key( $dataset_id, $mode );
			$meta = get_option( $key . '_meta', null );
			if ( ! is_array( $meta ) || array_is_list( $meta ) ) {
				continue;
			}
			if ( ! ( isset( $meta['label'] ) || isset( $meta['built_at'] ) ) ) {
				continue;
			}
			$audiences[] = self::snapshot_from_meta( $key, $meta, $dataset_id, $mode );
		}

		return $audiences;
	}

	/**
	 * Call Firebase and persist the audience list + meta.
	 *
	 * @param int         $dataset_id   Dataset post ID.
	 * @param string      $verification verified|unverified|all
	 * @param array       $args         Optional: dry_run (bool), label (string|null).
	 * @return array|WP_Error Snapshot on success, or dry-run summary when dry_run.
	 */
	public static function build( int $dataset_id, string $verification, array $args = array() ) {
		$verification = self::normalize_verification_mode( $verification );
		if ( is_wp_error( $verification ) ) {
			return $verification;
		}

		$dry_run = ! empty( $args['dry_run'] );
		$label   = $args['label'] ?? null;

		$dataset = get_post( $dataset_id );
		if ( ! $dataset || Content_Type::$post_object_name !== $dataset->post_type ) {
			return new WP_Error(
				'invalid_dataset',
				sprintf(
					'Post %d does not exist or is not a "%s" post type.',
					$dataset_id,
					Content_Type::$post_object_name
				),
				array( 'status' => 404 )
			);
		}

		$endpoints = apply_filters( 'prc_platform_firebase_audiences_endpoints', array() );
		$endpoint  = $endpoints[ self::FIREBASE_ENDPOINT_KEY ] ?? '';
		if ( empty( $endpoint ) ) {
			return new WP_Error(
				'missing_audience_endpoint',
				'No Firebase audiences endpoint configured for "dataset". ' .
				'Ensure client-mu-plugins/firebase-audiences.php is loaded and ' .
				'PRC_PLATFORM_FIREBASE_PROJECT_ID is defined.',
				array( 'status' => 500 )
			);
		}

		$firebase = new \PRC\Platform\Firebase();
		$id_token = $firebase->get_id_token( $endpoint );
		if ( is_wp_error( $id_token ) ) {
			return new WP_Error(
				'firebase_token_failed',
				'Failed to mint Firebase ID token: ' . $id_token->get_error_message(),
				array( 'status' => 500 )
			);
		}

		$response = wp_remote_post(
			$endpoint,
			array(
				'timeout' => 540,
				'headers' => array(
					'Authorization' => 'Bearer ' . $id_token,
					'Content-Type'  => 'application/json',
				),
				'body'    => wp_json_encode(
					self::build_audience_request_body(
						array( 'dataset_id' => $dataset_id ),
						$verification
					)
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			return new WP_Error(
				'firebase_request_failed',
				'HTTP request to Firebase function failed: ' . $response->get_error_message(),
				array( 'status' => 502 )
			);
		}

		$status_code = wp_remote_retrieve_response_code( $response );
		$body        = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 !== $status_code || empty( $body['success'] ) ) {
			$detail = is_array( $body ) ? ( $body['error'] ?? "HTTP {$status_code}" ) : "HTTP {$status_code}";
			return new WP_Error(
				'firebase_function_error',
				"Firebase function returned an error: {$detail}",
				array( 'status' => 502 )
			);
		}

		$verification = self::check_response_verification( $body, $verification );
		if ( is_wp_error( $verification ) ) {
			return $verification;
		}

		$emails        = $body['emails'] ?? array();
		$count         = (int) ( $body['count'] ?? count( $emails ) );
		$scanned_users = (int) ( $body['scanned_users'] ?? 0 );
		$matched_users = (int) ( $body['matched_users'] ?? 0 );
		$built_at      = $body['built_at'] ?? current_time( 'mysql', true );

		$summary = array(
			'key'          => self::option_key( $dataset_id, $verification ),
			'count'        => $count,
			'verification' => $verification,
			'scanned'      => $scanned_users,
			'matched'      => $matched_users,
			'built_at'     => $built_at,
			'dry_run'      => $dry_run,
		);

		if ( $dry_run ) {
			return $summary;
		}

		$audience_key = self::option_key( $dataset_id, $verification );
		$final_label  = is_string( $label ) && '' !== $label
			? $label
			: sprintf(
				'%s downloaders%s',
				$dataset->post_title,
				self::verification_label_suffix( $verification )
			);

		$meta = array(
			'label'         => $final_label,
			'count'         => $count,
			'verification'  => $verification,
			'dataset_id'    => $dataset_id,
			'dataset_title' => $dataset->post_title,
			'scanned_users' => $scanned_users,
			'matched_users' => $matched_users,
			'built_at'      => $built_at,
		);

		update_option( $audience_key, $emails, false );
		update_option( $audience_key . '_meta', $meta, false );

		return self::snapshot_from_meta( $audience_key, $meta, $dataset_id, $verification );
	}

	/**
	 * Delete a dataset audience and its meta companion.
	 *
	 * @param int         $dataset_id   Dataset post ID.
	 * @param string|null $verification Mode, or null when $key is provided.
	 * @param string|null $key          Full option key (must belong to this dataset).
	 * @return array|WP_Error { deleted: true, key, referencing_post_ids }
	 */
	public static function delete( int $dataset_id, ?string $verification = null, ?string $key = null ) {
		if ( is_string( $key ) && '' !== $key ) {
			$audience_key = $key;
			$prefix       = self::AUDIENCE_OPTION_PREFIX . $dataset_id . '_';
			if ( 0 !== strpos( $audience_key, $prefix ) || str_ends_with( $audience_key, '_meta' ) ) {
				return new WP_Error(
					'audience_key_mismatch',
					'Audience key does not belong to this dataset.',
					array( 'status' => 400 )
				);
			}
		} else {
			$verification = self::normalize_verification_mode( (string) $verification );
			if ( is_wp_error( $verification ) ) {
				return $verification;
			}
			$audience_key = self::option_key( $dataset_id, $verification );
		}

		$existing = get_option( $audience_key, false );
		if ( false === $existing ) {
			return new WP_Error(
				'audience_not_found',
				sprintf( 'Audience option "%s" does not exist.', $audience_key ),
				array( 'status' => 404 )
			);
		}

		$referencing = self::find_newsletters_using_audience( $audience_key );
		delete_option( $audience_key );
		delete_option( $audience_key . '_meta' );

		return array(
			'deleted'              => true,
			'key'                  => $audience_key,
			'referencing_post_ids' => $referencing,
		);
	}

	/**
	 * Newsletter post IDs that reference this audience option key.
	 *
	 * @param string $audience_key Option key.
	 * @return int[]
	 */
	public static function find_newsletters_using_audience( string $audience_key ): array {
		global $wpdb;

		$ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT DISTINCT post_id FROM {$wpdb->postmeta} WHERE meta_key = %s AND meta_value = %s",
				'prc_email_audience_option_key',
				$audience_key
			)
		);

		return array_map( 'intval', $ids ?: array() );
	}

	/**
	 * Map stored meta to the editor snapshot shape.
	 *
	 * @param string $key          Option key.
	 * @param array  $meta         Meta array.
	 * @param int    $dataset_id   Dataset ID.
	 * @param string $verification Mode.
	 * @return array<string, mixed>
	 */
	private static function snapshot_from_meta( string $key, array $meta, int $dataset_id, string $verification ): array {
		$stats = array();
		if ( isset( $meta['scanned_users'] ) ) {
			$stats['scanned'] = (int) $meta['scanned_users'];
		}
		if ( isset( $meta['matched_users'] ) ) {
			$stats['matched'] = (int) $meta['matched_users'];
		}

		return array(
			'key'                 => $key,
			'label'               => $meta['label'] ?? $key,
			'count'               => (int) ( $meta['count'] ?? 0 ),
			'verification'        => $meta['verification'] ?? $verification,
			'dataset_id'          => (int) ( $meta['dataset_id'] ?? $dataset_id ),
			'built_at'            => $meta['built_at'] ?? null,
			'builtAt'             => $meta['built_at'] ?? null,
			'referencingPostIds'  => self::find_newsletters_using_audience( $key ),
			'stats'               => $stats,
		);
	}
}
