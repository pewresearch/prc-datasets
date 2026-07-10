<?php
declare(strict_types=1);
/**
 * WP-CLI command: wp prc datasets build-audience
 *
 * Calls the Firebase Cloud Function `buildDatasetAudience` to resolve email
 * addresses for all users who downloaded a specific dataset (v2 RTDB records
 * only). Persists the email list in wp_options and optionally creates a draft
 * prc_email_txn post in system-email (Mandrill) delivery mode.
 *
 * Prerequisites:
 *  - Firebase Cloud Function `buildDatasetAudience` deployed with IAM restricted to the platform SA.
 *  - firebase-service-account.json in WPCOM_VIP_PRIVATE_DIR.
 *  - prc_platform_firebase_audiences_endpoints filter returning the function URL map.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

use PRC\Platform\CLI_Audience_Verification;
use WP_CLI;
use WP_CLI_Command;
use WP_CLI\Utils;

if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
	return;
}

require_once dirname( __DIR__, 2 ) . '/prc-firebase/includes/trait-cli-audience-verification.php';

/**
 * Builds a newsletter recipient audience from Firebase dataset downloaders.
 */
class CLI_Build_Audience extends WP_CLI_Command {

	use CLI_Audience_Verification;

	/**
	 * wp_options key prefix for audience email lists.
	 */
	const AUDIENCE_OPTION_PREFIX = 'prc_email_audience_dataset_';

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
	 * : Human-readable label for this audience. Defaults to "Dataset <id> downloaders (mode)".
	 *
	 * [--only-verified]
	 * : Include only users with a verified Firebase email (default when no verification flag is passed).
	 *
	 * [--only-unverified]
	 * : Include only users with an unverified Firebase email (must have an email on file).
	 *
	 * [--include-unverified]
	 * : Include all users with an email on file (verified and unverified). Mutually exclusive with the other verification flags.
	 *
	 * ## EXAMPLES
	 *
	 *     # Dry-run: verified downloaders for dataset 12345
	 *     wp prc datasets build-audience --dataset-id=12345 --dry-run
	 *
	 *     # Build verified-only audience and create a draft newsletter
	 *     wp prc datasets build-audience --dataset-id=12345 --only-verified
	 *
	 *     # Unverified-only list (separate wp_options key)
	 *     wp prc datasets build-audience --dataset-id=12345 --only-unverified --no-create-post
	 *
	 *     # All recipients with an email (verified + unverified)
	 *     wp prc datasets build-audience --dataset-id=12345 --include-unverified --no-create-post
	 *
	 * @param array $args       Positional arguments (unused).
	 * @param array $assoc_args Associative arguments.
	 */
	public function __invoke( $args, $assoc_args ) {
		$dataset_id     = (int) Utils\get_flag_value( $assoc_args, 'dataset-id', 0 );
		$dry_run        = (bool) Utils\get_flag_value( $assoc_args, 'dry-run', false );
		$no_create_post = (bool) Utils\get_flag_value( $assoc_args, 'no-create-post', false );
		$label          = Utils\get_flag_value( $assoc_args, 'label', null );

		$verification = self::resolve_verification_mode( $assoc_args );

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
			'Calling buildDatasetAudience for dataset %d ("%s", verification=%s)…',
			$dataset_id,
			$dataset->post_title,
			$verification
		) );

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
			WP_CLI::error( 'HTTP request to Firebase function failed: ' . $response->get_error_message() );
		}

		$status_code = wp_remote_retrieve_response_code( $response );
		$body        = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 !== $status_code || empty( $body['success'] ) ) {
			$detail = $body['error'] ?? "HTTP {$status_code}";
			WP_CLI::error( "Firebase function returned an error: {$detail}" );
		}

		// Fail closed unless the function confirmed the requested cohort. This
		// catches outdated deployments that would otherwise return a different
		// (e.g. broader) audience than --only-unverified asked for.
		$verification = self::assert_response_verification( $body, $verification );

		$emails        = $body['emails'] ?? array();
		$count         = (int) ( $body['count'] ?? count( $emails ) );
		$scanned_users = (int) ( $body['scanned_users'] ?? 0 );
		$matched_users = (int) ( $body['matched_users'] ?? 0 );
		$built_at      = $body['built_at'] ?? current_time( 'mysql', true );

		WP_CLI::line( sprintf(
			'Scanned %s users → %s matched → %s email(s) (%s).',
			number_format( $scanned_users ),
			number_format( $matched_users ),
			number_format( $count ),
			$verification
		) );

		if ( $dry_run ) {
			WP_CLI::success( 'Dry-run complete. No data written.' );
			return;
		}

		// ── Persist to wp_options ─────────────────────────────────────────────
		$audience_key = self::AUDIENCE_OPTION_PREFIX . $dataset_id . '_' . $verification;
		$meta_key     = $audience_key . '_meta';
		$final_label  = $label ?? sprintf(
			'%s downloaders%s',
			$dataset->post_title,
			self::verification_label_suffix( $verification )
		);

		update_option( $audience_key, $emails, false );
		update_option(
			$meta_key,
			array(
				'label'         => $final_label,
				'count'         => $count,
				'verification'  => $verification,
				'dataset_id'    => $dataset_id,
				'dataset_title' => $dataset->post_title,
				'scanned_users' => $scanned_users,
				'matched_users' => $matched_users,
				'built_at'      => $built_at,
			),
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

		if ( ! post_type_exists( 'prc_email_txn' ) ) {
			WP_CLI::warning(
				'The "prc_email_txn" post type is not registered. ' .
				'Ensure prc-email-builder is active. Skipping post creation.'
			);
			WP_CLI::success( sprintf(
				'Done. Audience option: %s  |  %s email(s)',
				$audience_key,
				number_format( $count )
			) );
			return;
		}

		$mode_title = self::verification_title_fragment( $verification );

		$post_id = wp_insert_post(
			array(
				'post_type'   => 'prc_email_txn',
				'post_status' => 'draft',
				'post_title'  => sprintf(
					'Update for %s downloaders%s',
					$dataset->post_title,
					$mode_title
				),
				'meta_input'  => array(
					'prc_email_delivery_mode'       => 'mandrill',
					'prc_email_audience_option_key' => $audience_key,
					'prc_email_subject'             => sprintf(
						'Update: %s%s',
						$dataset->post_title,
						$mode_title
					),
				),
			),
			true
		);

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
