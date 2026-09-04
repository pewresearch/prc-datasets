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
	const FIREBASE_ENDPOINT_KEY  = 'dataset_enqueue';

	/**
	 * Option key for a dataset audience list.
	 *
	 * @param int    $dataset_id   Dataset post ID.
	 * @param string $verification verified, unverified, or all.
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
	 * Register this builder with Email Builder when that plugin is active.
	 */
	public static function register_builder(): void {
		if ( ! class_exists( '\PRC\Platform\Email_Builder\Audience_Builder_Registry' ) ) {
			return;
		}

		\PRC\Platform\Email_Builder\Audience_Builder_Registry::register(
			array(
				'slug'                  => 'dataset-downloaders',
				'label'                 => 'Dataset downloaders',
				'description'           => 'Users who downloaded a dataset.',
				'option_prefix'         => self::AUDIENCE_OPTION_PREFIX,
				'form'                  => 'source-entity',
				'source_post_type'      => Content_Type::$post_object_name,
				'source_id_param'       => 'dataset_id',
				'source_id_meta'        => 'dataset_id',
				'source_title_meta'     => 'dataset_title',
				'job_id_prefix'         => 'ds_',
				'firebase_endpoint_key' => self::FIREBASE_ENDPOINT_KEY,
				'supports_create_draft' => true,
				'parse_input'           => array( self::class, 'parse_job_input' ),
				'enqueue_body'          => array( self::class, 'enqueue_body' ),
				'import'                => array( self::class, 'import_artifact' ),
			)
		);
	}

	/**
	 * Parse REST / hub / CLI input for a dataset downloaders job.
	 *
	 * @param array<string, mixed> $input REST / hub / CLI input.
	 * @return array<string, mixed>|WP_Error
	 */
	public static function parse_job_input( array $input ): array|WP_Error {
		$dataset_id = (int) ( $input['dataset_id'] ?? $input['datasetId'] ?? 0 );
		$dataset    = get_post( $dataset_id );
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

		$verification = self::normalize_verification_mode(
			(string) ( $input['verification'] ?? 'verified' )
		);
		if ( is_wp_error( $verification ) ) {
			return $verification;
		}

		$label = isset( $input['label'] ) && is_string( $input['label'] )
			? trim( $input['label'] )
			: '';
		if ( '' === $label ) {
			$label = sprintf(
				'%s downloaders%s',
				$dataset->post_title,
				self::verification_label_suffix( $verification )
			);
		}

		return array(
			'query'        => array(
				'datasetId'    => $dataset_id,
				'verification' => $verification,
			),
			'label'        => $label,
			'dryRun'       => ! empty( $input['dryRun'] ) || ! empty( $input['dry_run'] ),
			'sourcePostId' => $dataset_id,
		);
	}

	/**
	 * Firebase enqueue HTTP body for a dataset downloaders job.
	 *
	 * @param array<string, mixed> $job Internal job record.
	 * @return array<string, mixed>
	 */
	public static function enqueue_body( array $job ): array {
		return array(
			'jobId'        => $job['jobId'],
			'datasetId'    => $job['query']['datasetId'],
			'verification' => $job['query']['verification'],
			'dryRun'       => ! empty( $job['dryRun'] ),
		);
	}

	/**
	 * Persist a finished dataset audience artifact under the existing option key.
	 *
	 * @param array<string, mixed> $job      Stored WordPress job.
	 * @param array<string, mixed> $artifact Decoded Cloud Storage artifact.
	 * @return array<string, mixed>|WP_Error
	 */
	public static function import_artifact( array $job, array $artifact ): array|WP_Error {
		$dataset_id   = (int) ( $job['query']['datasetId'] ?? 0 );
		$verification = (string) ( $job['query']['verification'] ?? '' );
		if (
			1 !== ( $artifact['schemaVersion'] ?? null )
			|| ( $artifact['jobId'] ?? null ) !== $job['jobId']
			|| ! isset( $artifact['query'] )
			|| ! is_array( $artifact['query'] )
			|| (int) ( $artifact['query']['datasetId'] ?? 0 ) !== $dataset_id
		) {
			return new WP_Error(
				'artifact_invalid',
				'The audience artifact does not match this job.',
				array( 'status' => 502 )
			);
		}
		if ( ( $artifact['query']['verification'] ?? null ) !== $verification ) {
			return new WP_Error(
				'verification_mismatch',
				'The audience artifact verification mode does not match this job.',
				array( 'status' => 502 )
			);
		}

		$emails = self::validated_artifact_emails( $artifact );
		if ( is_wp_error( $emails ) ) {
			return $emails;
		}

		$dataset = get_post( $dataset_id );
		if ( ! $dataset || Content_Type::$post_object_name !== $dataset->post_type ) {
			return new WP_Error(
				'invalid_dataset',
				'The dataset for this audience job no longer exists.',
				array( 'status' => 404 )
			);
		}

		$audience_key = self::option_key( $dataset_id, $verification );
		$label        = is_string( $job['label'] ?? null ) && '' !== $job['label']
			? $job['label']
			: sprintf(
				'%s downloaders%s',
				$dataset->post_title,
				self::verification_label_suffix( $verification )
			);
		$meta         = array(
			'label'         => $label,
			'count'         => count( $emails ),
			'verification'  => $verification,
			'dataset_id'    => $dataset_id,
			'dataset_title' => $dataset->post_title,
			'scanned_users' => (int) ( $artifact['scannedUsers'] ?? 0 ),
			'matched_users' => (int) ( $artifact['matchedUsers'] ?? 0 ),
			'built_at'      => $artifact['builtAt'],
		);

		update_option( $audience_key, $emails, false );
		update_option( $audience_key . '_meta', $meta, false );

		return self::snapshot_from_meta( $audience_key, $meta, $dataset_id, $verification );
	}

	/**
	 * Enqueue a Firebase audience job. Does not wait for the scan.
	 *
	 * @param int    $dataset_id   Dataset post ID.
	 * @param string $verification verified, unverified, or all.
	 * @param array  $args         Optional dry_run (bool) and label (string|null).
	 * @return array|WP_Error Job view.
	 */
	public static function start_job( int $dataset_id, string $verification, array $args = array() ) {
		if ( ! class_exists( '\PRC\Platform\Email_Builder\Audience_Job' ) ) {
			return new WP_Error(
				'missing_email_builder',
				'Email Builder is required to start dataset audience jobs.',
				array( 'status' => 500 )
			);
		}

		return \PRC\Platform\Email_Builder\Audience_Job::start(
			'dataset-downloaders',
			array(
				'dataset_id'   => $dataset_id,
				'verification' => $verification,
				'label'        => $args['label'] ?? null,
				'dryRun'       => ! empty( $args['dry_run'] ),
			)
		);
	}

	/**
	 * Start a job and wait until it is ready or failed. CLI use.
	 *
	 * @param int    $dataset_id   Dataset post ID.
	 * @param string $verification verified, unverified, or all.
	 * @param array  $args         Optional dry_run (bool) and label (string|null).
	 * @return array|WP_Error Snapshot on success, or dry-run summary when dry_run.
	 */
	public static function build( int $dataset_id, string $verification, array $args = array() ) {
		$view = self::start_job( $dataset_id, $verification, $args );
		if ( is_wp_error( $view ) ) {
			return $view;
		}
		if ( 'failed' === ( $view['phase'] ?? '' ) ) {
			return new WP_Error(
				$view['error']['code'] ?? 'scan_failed',
				$view['error']['message'] ?? 'The audience job failed.',
				array( 'status' => 502 )
			);
		}

		$wait = \PRC\Platform\Email_Builder\Audience_Job::wait( (string) $view['jobId'] );
		if ( is_wp_error( $wait ) ) {
			return $wait;
		}
		if ( 'failed' === ( $wait['phase'] ?? '' ) ) {
			return new WP_Error(
				$wait['error']['code'] ?? 'scan_failed',
				$wait['error']['message'] ?? 'The audience job failed.',
				array( 'status' => 502 )
			);
		}

		$verification = (string) ( $wait['query']['verification'] ?? $verification );
		if ( ! empty( $wait['dryRun'] ) ) {
			return array(
				'key'          => self::option_key( $dataset_id, $verification ),
				'count'        => (int) ( $wait['count'] ?? 0 ),
				'verification' => $verification,
				'scanned'      => (int) ( $wait['scannedUsers'] ?? 0 ),
				'matched'      => (int) ( $wait['matchedUsers'] ?? 0 ),
				'built_at'     => null,
				'dry_run'      => true,
			);
		}

		return $wait['audience'] ?? new WP_Error(
			'scan_failed',
			'The audience job finished without an imported list.',
			array( 'status' => 502 )
		);
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

		return array_map( 'intval', empty( $ids ) ? array() : $ids );
	}

	/**
	 * Validate artifact emails and count.
	 *
	 * @param array<string, mixed> $artifact Decoded artifact.
	 * @return string[]|WP_Error
	 */
	private static function validated_artifact_emails( array $artifact ): array|WP_Error {
		$emails = $artifact['emails'] ?? null;
		if (
			! is_array( $emails )
			|| ! array_is_list( $emails )
			|| ! isset( $artifact['count'] )
			|| ! is_int( $artifact['count'] )
			|| count( $emails ) !== $artifact['count']
			|| ! isset( $artifact['builtAt'] )
			|| ! is_string( $artifact['builtAt'] )
		) {
			return new WP_Error(
				'artifact_invalid',
				'The audience artifact has an invalid shape.',
				array( 'status' => 502 )
			);
		}

		$validated = array();
		foreach ( $emails as $email ) {
			if ( ! is_string( $email ) ) {
				return new WP_Error(
					'artifact_invalid',
					'The audience artifact contains an invalid email.',
					array( 'status' => 502 )
				);
			}
			$normalized = strtolower( trim( $email ) );
			if ( ! is_email( $normalized ) ) {
				continue;
			}
			if ( isset( $validated[ $normalized ] ) ) {
				return new WP_Error(
					'artifact_invalid',
					'The audience artifact contains duplicate emails.',
					array( 'status' => 502 )
				);
			}
			$validated[ $normalized ] = $normalized;
		}

		return array_values( $validated );
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
			'key'                => $key,
			'label'              => $meta['label'] ?? $key,
			'count'              => (int) ( $meta['count'] ?? 0 ),
			'verification'       => $meta['verification'] ?? $verification,
			'dataset_id'         => (int) ( $meta['dataset_id'] ?? $dataset_id ),
			'built_at'           => $meta['built_at'] ?? null,
			'builtAt'            => $meta['built_at'] ?? null,
			'referencingPostIds' => self::find_newsletters_using_audience( $key ),
			'stats'              => $stats,
		);
	}
}
