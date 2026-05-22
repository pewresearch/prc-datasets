<?php
declare(strict_types=1);
/**
 * WP-CLI command: wp prc datasets build-audience
 *
 * Calls the Firebase Cloud Function `buildDatasetAudience` to resolve email
 * addresses for all users who downloaded a specific dataset (v2 RTDB records
 * only). Persists the email list in wp_options and optionally creates a draft
 * prc_newsletter post in system-email (Mandrill) delivery mode.
 *
 * Prerequisites:
 *  - Firebase Cloud Function `buildDatasetAudience` deployed with IAM restricted to the platform SA.
 *  - firebase-service-account-*.json in WPCOM_VIP_PRIVATE_DIR.
 *  - prc_platform_firebase_audiences_endpoints filter returning the function URL map.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

use WP_CLI;
use WP_CLI_Command;
use WP_CLI\Utils;

if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
	return;
}

/**
 * Builds a newsletter recipient audience from Firebase dataset downloaders.
 */
class CLI_Build_Audience extends WP_CLI_Command {

	/**
	 * wp_options key prefix for audience email lists.
	 */
	const AUDIENCE_OPTION_PREFIX = 'prc_newsletter_audience_dataset_';

	/**
	 * Resolve email addresses for users who downloaded a specific dataset
	 * and optionally create a draft newsletter post targeting them.
	 *
	 * Calls the Firebase Cloud Function `buildDatasetAudience` which walks the
	 * RTDB users tree (v2 dataset records only), resolves UIDs to emails via
	 * Firebase Auth, and returns a deduped list. The email list is persisted in
	 * wp_options; a companion _meta option records provenance for the sidebar UI.
	 *
	 * ## OPTIONS
	 *
	 * --dataset-id=<id>
	 * : WordPress post ID of the dataset to build the audience for.
	 *
	 * [--dry-run]
	 * : Report the audience size from the Cloud Function without writing to
	 *   wp_options or creating a newsletter draft.
	 *
	 * [--no-create-post]
	 * : Persist the audience in wp_options but skip creating a newsletter draft.
	 *
	 * [--label=<text>]
	 * : Human-readable label for this audience. Defaults to "Dataset <id> downloaders".
	 *
	 * [--include-unverified]
	 * : Include users whose Firebase email address is not verified. Defaults to
	 *   excluding unverified accounts.
	 *
	 * ## EXAMPLES
	 *
	 *     # Dry-run: see how many users downloaded dataset 12345
	 *     wp prc datasets build-audience --dataset-id=12345 --dry-run
	 *
	 *     # Build audience and create a draft newsletter
	 *     wp prc datasets build-audience --dataset-id=12345
	 *
	 *     # Build with a custom label, skip post creation
	 *     wp prc datasets build-audience --dataset-id=12345 --no-create-post --label="ANES 2024 Downloaders"
	 *
	 *     # Include users who never verified their email
	 *     wp prc datasets build-audience --dataset-id=12345 --include-unverified
	 *
	 * @param array $args       Positional arguments (unused).
	 * @param array $assoc_args Associative arguments.
	 */
	public function __invoke( $args, $assoc_args ) {
		$dataset_id        = (int) Utils\get_flag_value( $assoc_args, 'dataset-id', 0 );
		$dry_run           = (bool) Utils\get_flag_value( $assoc_args, 'dry-run', false );
		$no_create_post    = (bool) Utils\get_flag_value( $assoc_args, 'no-create-post', false );
		$label             = Utils\get_flag_value( $assoc_args, 'label', null );
		$include_unverified = (bool) Utils\get_flag_value( $assoc_args, 'include-unverified', false );

		// ── Validate dataset ──────────────────────────────────────────────────
		if ( $dataset_id <= 0 ) {
			WP_CLI::error( '--dataset-id is required and must be a positive integer.' );
		}

		$dataset = get_post( $dataset_id );
		if ( ! $dataset || Content_Type::$post_object_name !== $dataset->post_type ) {
			WP_CLI::error( sprintf(
				'Post %d does not exist or is not a "%s" post type.',
				$dataset_id,
				Content_Type::$post_object_name
			) );
		}

		// ── Read Firebase config ──────────────────────────────────────────────
		$endpoints = apply_filters( 'prc_platform_firebase_audiences_endpoints', array() );
		$endpoint  = $endpoints['dataset'] ?? '';

		if ( empty( $endpoint ) ) {
			WP_CLI::error(
				'No Firebase audiences endpoint configured for "dataset". ' .
				'Ensure client-mu-plugins/firebase-audiences.php is loaded and ' .
				'PRC_PLATFORM_FIREBASE_PROJECT_ID is defined.'
			);
		}

		$firebase = new \PRC\Platform\Firebase();
		$id_token = $firebase->get_id_token( $endpoint );
		if ( is_wp_error( $id_token ) ) {
			WP_CLI::error( 'Failed to mint Firebase ID token: ' . $id_token->get_error_message() );
		}

		// ── Call the Cloud Function ───────────────────────────────────────────
		WP_CLI::line( sprintf(
			'Calling buildDatasetAudience for dataset %d ("%s")…',
			$dataset_id,
			$dataset->post_title
		) );

		$response = wp_remote_post(
			$endpoint,
			[
				'timeout' => 540,
				'headers' => [
					'Authorization' => 'Bearer ' . $id_token,
					'Content-Type'  => 'application/json',
				],
				'body'    => wp_json_encode( [
					'dataset_id'       => $dataset_id,
					'require_verified' => ! $include_unverified,
				] ),
			]
		);

		if ( is_wp_error( $response ) ) {
			WP_CLI::error( 'HTTP request to Firebase function failed: ' . $response->get_error_message() );
		}

		$status_code = wp_remote_retrieve_response_code( $response );
		$body        = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( $status_code !== 200 || empty( $body['success'] ) ) {
			$detail = $body['error'] ?? "HTTP {$status_code}";
			WP_CLI::error( "Firebase function returned an error: {$detail}" );
		}

		$emails        = $body['emails'] ?? [];
		$count         = (int) ( $body['count'] ?? count( $emails ) );
		$scanned_users = (int) ( $body['scanned_users'] ?? 0 );
		$matched_users = (int) ( $body['matched_users'] ?? 0 );
		$built_at      = $body['built_at'] ?? current_time( 'mysql', true );

		WP_CLI::line( sprintf(
			'Scanned %s users → %s matched → %s valid email(s).',
			number_format( $scanned_users ),
			number_format( $matched_users ),
			number_format( $count )
		) );

		if ( $dry_run ) {
			WP_CLI::success( 'Dry-run complete. No data written.' );
			return;
		}

		// ── Persist to wp_options ─────────────────────────────────────────────
		$audience_key = self::AUDIENCE_OPTION_PREFIX . $dataset_id;
		$meta_key     = $audience_key . '_meta';
		$final_label  = $label ?? sprintf( 'Dataset %d downloaders', $dataset_id );

		update_option( $audience_key, $emails, false );
		update_option(
			$meta_key,
			[
				'label'         => $final_label,
				'count'         => $count,
				'dataset_id'    => $dataset_id,
				'dataset_title' => $dataset->post_title,
				'scanned_users' => $scanned_users,
				'matched_users' => $matched_users,
				'built_at'      => $built_at,
			],
			false
		);

		WP_CLI::line( sprintf(
			'Audience saved → option key: %s',
			$audience_key
		) );

		// ── Optionally create a draft newsletter ──────────────────────────────
		if ( $no_create_post ) {
			WP_CLI::success( sprintf(
				'Done. Audience option: %s  |  %s email(s)',
				$audience_key,
				number_format( $count )
			) );
			return;
		}

		// Soft-check that prc_newsletter post type is registered.
		if ( ! post_type_exists( 'prc_newsletter' ) ) {
			WP_CLI::warning(
				'The "prc_newsletter" post type is not registered. ' .
				'Ensure prc-newsletter-builder is active. Skipping post creation.'
			);
			WP_CLI::success( sprintf(
				'Done. Audience option: %s  |  %s email(s)',
				$audience_key,
				number_format( $count )
			) );
			return;
		}

		$post_id = wp_insert_post( [
			'post_type'   => 'prc_newsletter',
			'post_status' => 'draft',
			'post_title'  => sprintf( 'Update for %s downloaders', $dataset->post_title ),
			'meta_input'  => [
				'prc_newsletter_delivery_mode'       => 'mandrill',
				'prc_newsletter_audience_option_key' => $audience_key,
				'prc_newsletter_subject'             => sprintf( 'Update: %s', $dataset->post_title ),
			],
		], true );

		if ( is_wp_error( $post_id ) ) {
			WP_CLI::warning( 'Could not create newsletter draft: ' . $post_id->get_error_message() );
		} else {
			$edit_url = admin_url( "post.php?post={$post_id}&action=edit" );
			WP_CLI::line( sprintf( 'Newsletter draft created → %s', $edit_url ) );
		}

		WP_CLI::success( sprintf(
			'Done. Audience option: %s  |  %s email(s)',
			$audience_key,
			number_format( $count )
		) );
	}
}

WP_CLI::add_command( 'prc datasets build-audience', '\\PRC\\Platform\\Datasets\\CLI_Build_Audience' );
