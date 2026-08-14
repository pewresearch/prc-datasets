<?php
declare(strict_types=1);
/**
 * WP-CLI command: wp prc datasets build-audience
 *
 * Thin wrapper around Audience_Service. Optionally creates a draft
 * prc_email_txn after a successful build.
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
	 * Resolve email addresses for users who downloaded a specific dataset
	 * and optionally create a draft newsletter post targeting them.
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
	 *     wp prc datasets build-audience --dataset-id=12345 --dry-run
	 *     wp prc datasets build-audience --dataset-id=12345 --only-verified
	 *     wp prc datasets build-audience --dataset-id=12345 --only-unverified --no-create-post
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
		$verification   = self::resolve_verification_mode( $assoc_args );

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

		WP_CLI::line( sprintf(
			'Calling buildDatasetAudience for dataset %d ("%s", verification=%s)…',
			$dataset_id,
			$dataset->post_title,
			$verification
		) );

		$result = Audience_Service::build(
			$dataset_id,
			$verification,
			array(
				'dry_run' => $dry_run,
				'label'   => $label,
			)
		);

		if ( is_wp_error( $result ) ) {
			WP_CLI::error( $result->get_error_message() );
		}

		$stats = $result['stats'] ?? array();
		WP_CLI::line( sprintf(
			'Scanned %s users → %s matched → %s email(s) (%s).',
			number_format( (int) ( $stats['scanned'] ?? $result['scanned'] ?? 0 ) ),
			number_format( (int) ( $stats['matched'] ?? $result['matched'] ?? 0 ) ),
			number_format( (int) ( $result['count'] ?? 0 ) ),
			$result['verification'] ?? $verification
		) );

		if ( $dry_run ) {
			WP_CLI::success( 'Dry-run complete. No data written.' );
			return;
		}

		$audience_key = $result['key'];
		WP_CLI::line( sprintf( 'Audience saved → option key: %s', $audience_key ) );

		if ( $no_create_post ) {
			WP_CLI::success( sprintf(
				'Done. Audience option: %s  |  %s email(s)',
				$audience_key,
				number_format( (int) $result['count'] )
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
				number_format( (int) $result['count'] )
			) );
			return;
		}

		$mode_title = self::verification_title_fragment( $result['verification'] ?? $verification );

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
			number_format( (int) $result['count'] )
		) );
	}
}

WP_CLI::add_command( 'prc datasets build-audience', '\\PRC\\Platform\\Datasets\\CLI_Build_Audience' );
