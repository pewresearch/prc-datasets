<?php
namespace PRC\Platform\Datasets;

use WPCOM_VIP_CLI_Command;
use WP_CLI;
use WP_Error;
use WP_CLI\Formatter;
use WP_CLI\Utils;

// If WPCOM_VIP_CLI_Command does not exist exit early.
if ( ! class_exists( 'WPCOM_VIP_CLI_Command' ) ) {
	return;
}

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	/**
	 * Manage the migration of posts from one site to the new pewresearch-org.
	 */
	class CLI extends WPCOM_VIP_CLI_Command {

		public function __construct() {
		}

		/**
		 * Display download statistics for ATP public datasets by year.
		 *
		 * Queries all published datasets marked as ATP and aggregates their download
		 * counts by year.
		 *
		 * ## OPTIONS
		 *
		 * [--year=<year>]
		 * : Filter results to a specific year.
		 *
		 * [--format=<format>]
		 * : Output format. Accepts: table, csv, json, yaml. Default: table.
		 *
		 * [--detailed]
		 * : Show monthly breakdown within each year.
		 *
		 * [--per-dataset]
		 * : Show downloads per individual dataset instead of aggregated totals.
		 *
		 * ## EXAMPLES
		 *
		 *     # Show aggregated ATP download stats by year
		 *     wp prc datasets atp-downloads
		 *
		 *     # Show stats for a specific year
		 *     wp prc datasets atp-downloads --year=2024
		 *
		 *     # Show monthly breakdown
		 *     wp prc datasets atp-downloads --detailed
		 *
		 *     # Show per-dataset breakdown
		 *     wp prc datasets atp-downloads --per-dataset
		 *
		 *     # Export as CSV
		 *     wp prc datasets atp-downloads --format=csv > atp_downloads.csv
		 *
		 * @param array $args       Positional arguments.
		 * @param array $assoc_args Associative arguments.
		 * @subcommand atp-downloads
		 */
		public function atp_downloads( $args, $assoc_args ) {
			$format       = Utils\get_flag_value( $assoc_args, 'format', 'table' );
			$filter_year  = Utils\get_flag_value( $assoc_args, 'year', null );
			$detailed     = Utils\get_flag_value( $assoc_args, 'detailed', false );
			$per_dataset  = Utils\get_flag_value( $assoc_args, 'per-dataset', false );
			$start_year   = 2020;
			$current_year = (int) gmdate( 'Y' );

			// Validate year if provided.
			if ( null !== $filter_year ) {
				$filter_year = (int) $filter_year;
				if ( $filter_year < $start_year || $filter_year > $current_year ) {
					WP_CLI::error( sprintf( 'Year must be between %d and %d.', $start_year, $current_year ) );
				}
			}

			WP_CLI::line( 'Querying ATP datasets...' );

			$posts_per_page = 100;
			$paged          = 1;
			$datasets       = array();

			do {
				$query_args = array(
					'post_type'        => Content_Type::$post_object_name,
					'posts_per_page'   => $posts_per_page,
					'paged'            => $paged,
					'post_status'      => 'publish',
					'suppress_filters' => false,
					'meta_query'       => array(
						array(
							'key'     => Content_Type::$atp_legal_key,
							'value'   => '1',
							'compare' => '=',
						),
					),
				);

				$posts = get_posts( $query_args );

				foreach ( $posts as $post ) {
					$datasets[] = array(
						'id'    => $post->ID,
						'title' => $post->post_title,
					);
				}

				++$paged;

				// Free up memory.
				$this->vip_inmemory_cleanup();

			} while ( count( $posts ) === $posts_per_page );

			$total_datasets = count( $datasets );

			if ( 0 === $total_datasets ) {
				WP_CLI::warning( 'No ATP datasets found.' );
				return;
			}

			WP_CLI::line( sprintf( 'Found %d ATP datasets. Collecting download statistics...', $total_datasets ) );

			// Determine which years to process.
			$years = null !== $filter_year
				? array( $filter_year )
				: range( $start_year, $current_year );

			if ( $per_dataset ) {
				$this->output_per_dataset_stats( $datasets, $years, $detailed, $format );
			} else {
				$this->output_aggregated_stats( $datasets, $years, $detailed, $format );
			}
		}

		/**
		 * Output aggregated download statistics by year.
		 *
		 * @param array  $datasets The list of ATP datasets.
		 * @param array  $years    The years to process.
		 * @param bool   $detailed Whether to show monthly breakdown.
		 * @param string $format   The output format.
		 */
		private function output_aggregated_stats( $datasets, $years, $detailed, $format ) {
			$yearly_stats = array();
			$grand_total  = 0;

			foreach ( $years as $year ) {
				$yearly_stats[ $year ] = array(
					'total'   => 0,
					'months'  => array_fill( 1, 12, 0 ),
				);
			}

			$progress = Utils\make_progress_bar( 'Processing datasets', count( $datasets ) );

			foreach ( $datasets as $dataset ) {
				$dataset_id = $dataset['id'];
				$total      = (int) get_post_meta( $dataset_id, Content_Type::$total_downloads_meta_key, true );
				$grand_total += $total;

				foreach ( $years as $year ) {
					$meta_key   = '_downloads_' . $year;
					$year_data  = get_post_meta( $dataset_id, $meta_key, true );

					if ( is_array( $year_data ) ) {
						foreach ( $year_data as $month => $count ) {
							$month = (int) $month;
							if ( $month >= 1 && $month <= 12 ) {
								$yearly_stats[ $year ]['months'][ $month ] += (int) $count;
								$yearly_stats[ $year ]['total'] += (int) $count;
							}
						}
					}
				}

				$progress->tick();
			}

			$progress->finish();

			// Format output.
			if ( $detailed ) {
				$output = array();
				foreach ( $years as $year ) {
					$row = array(
						'year'  => $year,
						'total' => $yearly_stats[ $year ]['total'],
					);
					// Add monthly columns.
					$month_names = array( 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' );
					for ( $m = 1; $m <= 12; $m++ ) {
						$row[ $month_names[ $m - 1 ] ] = $yearly_stats[ $year ]['months'][ $m ];
					}
					$output[] = $row;
				}

				$fields = array( 'year', 'total', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' );
			} else {
				$output = array();
				foreach ( $years as $year ) {
					$output[] = array(
						'year'      => $year,
						'downloads' => $yearly_stats[ $year ]['total'],
					);
				}
				$fields = array( 'year', 'downloads' );
			}

			// Add totals row for non-JSON/YAML formats.
			if ( ! in_array( $format, array( 'json', 'yaml' ), true ) ) {
				$totals_row = array( 'year' => 'TOTAL' );
				if ( $detailed ) {
					$totals_row['total'] = array_sum( array_column( $output, 'total' ) );
					$month_names = array( 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' );
					foreach ( $month_names as $month ) {
						$totals_row[ $month ] = array_sum( array_column( $output, $month ) );
					}
				} else {
					$totals_row['downloads'] = array_sum( array_column( $output, 'downloads' ) );
				}
				$output[] = $totals_row;
			}

			$formatted = Utils\format_items( $format, $output, $fields );
			WP_CLI::line( $formatted );

			WP_CLI::line( '' );
			WP_CLI::success( sprintf( 'Total ATP datasets: %d | Grand total downloads (all time): %s', count( $datasets ), number_format( $grand_total ) ) );
		}

		/**
		 * Output per-dataset download statistics.
		 *
		 * @param array  $datasets The list of ATP datasets.
		 * @param array  $years    The years to process.
		 * @param bool   $detailed Whether to show monthly breakdown.
		 * @param string $format   The output format.
		 */
		private function output_per_dataset_stats( $datasets, $years, $detailed, $format ) {
			$output      = array();
			$grand_total = 0;

			$progress = Utils\make_progress_bar( 'Processing datasets', count( $datasets ) );

			foreach ( $datasets as $dataset ) {
				$dataset_id = $dataset['id'];
				$total      = (int) get_post_meta( $dataset_id, Content_Type::$total_downloads_meta_key, true );
				$grand_total += $total;

				$row = array(
					'id'        => $dataset_id,
					'title'     => mb_substr( $dataset['title'], 0, 50 ) . ( mb_strlen( $dataset['title'] ) > 50 ? '...' : '' ),
					'total'     => $total,
				);

				// Add yearly columns.
				foreach ( $years as $year ) {
					$meta_key   = '_downloads_' . $year;
					$year_data  = get_post_meta( $dataset_id, $meta_key, true );
					$year_total = 0;

					if ( is_array( $year_data ) ) {
						$year_total = array_sum( $year_data );
					}

					$row[ (string) $year ] = $year_total;
				}

				$output[] = $row;
				$progress->tick();
			}

			$progress->finish();

			// Sort by total downloads descending.
			usort( $output, function ( $a, $b ) {
				return $b['total'] - $a['total'];
			} );

			$fields = array_merge( array( 'id', 'title', 'total' ), array_map( 'strval', $years ) );

			$formatted = Utils\format_items( $format, $output, $fields );
			WP_CLI::line( $formatted );

			WP_CLI::line( '' );
			WP_CLI::success( sprintf( 'Total ATP datasets: %d | Grand total downloads (all time): %s', count( $datasets ), number_format( $grand_total ) ) );
		}

		/**
		 * Display user statistics for ATP dataset downloaders from Firebase.
		 *
		 * Reads pre-computed statistics from Firebase that are maintained by
		 * Cloud Functions. Statistics include:
		 * - Total number of unique users who have downloaded any ATP dataset
		 * - Average number of datasets downloaded per user
		 * - Median number of datasets downloaded per user
		 *
		 * ## OPTIONS
		 *
		 * [--format=<format>]
		 * : Output format. Accepts: table, csv, json, yaml. Default: table.
		 *
		 * [--include-distribution]
		 * : Include a distribution breakdown of downloads per user.
		 *
		 * [--refresh]
		 * : Force a refresh of the cached ATP dataset IDs in Firebase.
		 *
		 * ## EXAMPLES
		 *
		 *     # Show ATP user download statistics
		 *     wp prc datasets atp-user-stats
		 *
		 *     # Show with distribution breakdown
		 *     wp prc datasets atp-user-stats --include-distribution
		 *
		 *     # Refresh ATP dataset IDs and show stats
		 *     wp prc datasets atp-user-stats --refresh
		 *
		 *     # Export as JSON
		 *     wp prc datasets atp-user-stats --format=json
		 *
		 * @param array $args       Positional arguments.
		 * @param array $assoc_args Associative arguments.
		 * @subcommand atp-user-stats
		 */
		public function atp_user_stats( $args, $assoc_args ) {
			$format               = Utils\get_flag_value( $assoc_args, 'format', 'table' );
			$include_distribution = Utils\get_flag_value( $assoc_args, 'include-distribution', false );
			$refresh              = Utils\get_flag_value( $assoc_args, 'refresh', false );

			// Check if Firebase class exists.
			if ( ! class_exists( '\PRC\Platform\Firebase' ) ) {
				WP_CLI::error( 'Firebase class not found. Please ensure prc-platform-core is active.' );
				return;
			}

			WP_CLI::line( 'Connecting to Firebase...' );

			try {
				$firebase = new \PRC\Platform\Firebase( null );
				$db       = $firebase->db;

				if ( ! $db ) {
					WP_CLI::error( 'Failed to connect to Firebase database.' );
					return;
				}

				// Optionally refresh the ATP dataset IDs.
				if ( $refresh ) {
					WP_CLI::line( 'Refreshing ATP dataset IDs in Firebase...' );
					$sync   = new Firebase_Sync( null );
					$result = $sync->sync_atp_dataset_ids();

					if ( is_wp_error( $result ) ) {
						WP_CLI::warning( 'Failed to refresh ATP dataset IDs: ' . $result->get_error_message() );
					} else {
						WP_CLI::success( 'ATP dataset IDs refreshed in Firebase.' );
					}
				}

				WP_CLI::line( 'Reading pre-computed statistics from Firebase...' );

				// Read pre-computed stats from Firebase.
				$stats = $db->getReference( 'stats/atp-downloads' )->getValue();

				if ( empty( $stats ) ) {
					WP_CLI::warning( 'No pre-computed stats found in Firebase.' );
					WP_CLI::line( '' );
					WP_CLI::line( 'Statistics are computed by Firebase Cloud Functions.' );
					WP_CLI::line( 'The scheduled function runs daily at 3:00 AM UTC.' );
					WP_CLI::line( '' );
					WP_CLI::line( 'To manually trigger computation:' );
					WP_CLI::line( '  1. Ensure ATP dataset IDs are synced: wp prc datasets atp-user-stats --refresh' );
					WP_CLI::line( '  2. Trigger the Cloud Function via HTTP or wait for scheduled run.' );
					return;
				}

				// Display last updated time.
				$last_updated = isset( $stats['lastUpdated'] ) ? $stats['lastUpdated'] : 'Unknown';
				WP_CLI::line( sprintf( 'Stats last computed: %s', $last_updated ) );
				WP_CLI::line( '' );

				// Output main statistics.
				$output = array(
					array(
						'metric' => 'Total users who downloaded ATP datasets',
						'value'  => isset( $stats['totalUsersWithDownloads'] ) ? $stats['totalUsersWithDownloads'] : 0,
					),
					array(
						'metric' => 'Average ATP datasets per user',
						'value'  => isset( $stats['averagePerUser'] ) ? round( $stats['averagePerUser'], 2 ) : 0,
					),
					array(
						'metric' => 'Median ATP datasets per user',
						'value'  => isset( $stats['medianPerUser'] ) ? $stats['medianPerUser'] : 0,
					),
					array(
						'metric' => 'Total ATP dataset downloads',
						'value'  => isset( $stats['totalDownloads'] ) ? $stats['totalDownloads'] : 0,
					),
					array(
						'metric' => 'Min datasets per user',
						'value'  => isset( $stats['minPerUser'] ) ? $stats['minPerUser'] : 0,
					),
					array(
						'metric' => 'Max datasets per user',
						'value'  => isset( $stats['maxPerUser'] ) ? $stats['maxPerUser'] : 0,
					),
					array(
						'metric' => 'ATP datasets tracked',
						'value'  => isset( $stats['atpDatasetIds'] ) ? count( $stats['atpDatasetIds'] ) : 0,
					),
				);

				$formatted = Utils\format_items( $format, $output, array( 'metric', 'value' ) );
				WP_CLI::line( $formatted );

				// Output distribution if requested.
				if ( $include_distribution && isset( $stats['distribution'] ) && ! empty( $stats['distribution'] ) ) {
					$total_users = isset( $stats['totalUsersWithDownloads'] ) ? $stats['totalUsersWithDownloads'] : 1;

					WP_CLI::line( '' );
					WP_CLI::line( 'Download Distribution (number of datasets → number of users):' );

					$distribution = $stats['distribution'];
					ksort( $distribution );

					$dist_output = array();
					foreach ( $distribution as $num_datasets => $num_users ) {
						$dist_output[] = array(
							'datasets_downloaded' => $num_datasets,
							'user_count'          => $num_users,
							'percentage'          => round( ( $num_users / $total_users ) * 100, 1 ) . '%',
						);
					}

					$formatted = Utils\format_items( $format, $dist_output, array( 'datasets_downloaded', 'user_count', 'percentage' ) );
					WP_CLI::line( $formatted );
				}

				WP_CLI::line( '' );
				WP_CLI::success( 'ATP user statistics retrieved successfully.' );

			} catch ( \Exception $e ) {
				WP_CLI::error( 'Firebase error: ' . $e->getMessage() );
			}
		}

		/**
		 * Sync ATP dataset IDs to Firebase.
		 *
		 * Updates the config/atp-dataset-ids reference in Firebase which is used by
		 * Cloud Functions to compute user download statistics.
		 *
		 * ## EXAMPLES
		 *
		 *     # Sync ATP dataset IDs to Firebase
		 *     wp prc datasets sync-atp-ids
		 *
		 * @param array $args       Positional arguments.
		 * @param array $assoc_args Associative arguments.
		 * @subcommand sync-atp-ids
		 */
		public function sync_atp_ids( $args, $assoc_args ) {
			// Check if Firebase class exists.
			if ( ! class_exists( '\PRC\Platform\Firebase' ) ) {
				WP_CLI::error( 'Firebase class not found. Please ensure prc-platform-core is active.' );
				return;
			}

			WP_CLI::line( 'Syncing ATP dataset IDs to Firebase...' );

			$sync   = new Firebase_Sync( null );
			$result = $sync->sync_atp_dataset_ids();

			if ( is_wp_error( $result ) ) {
				WP_CLI::error( 'Failed to sync: ' . $result->get_error_message() );
				return;
			}

			$atp_ids = $sync->get_atp_dataset_ids();
			WP_CLI::success( sprintf( 'Successfully synced %d ATP dataset IDs to Firebase.', count( $atp_ids ) ) );
		}

		/**
		 * Query and mark datasets that are missing files.
		 *
		 * @param array $args
		 * @param array $assoc_args
		 * @command datasets missing-files
		 * @synopsis [--dry-run]
		 */
		public function missing_files( $args, $assoc_args ) {
			// Disable term counting, Elasticsearch indexing, and PushPress.
			$this->start_bulk_operation();

			if ( isset( $assoc_args['dry-run'] ) ) {
				// Passing `--dry-run=false` to the command leads to the `false` value being set to string `'false'`, but casting `'false'` to bool produces `true`. Thus the special handling.
				if ( 'false' === $assoc_args['dry-run'] ) {
					$dry_run = false;
				} else {
					$dry_run = (bool) $assoc_args['dry-run'];
				}
			} else {
				$dry_run = true;
			}

			if ( false === $dry_run ) {
				WP_CLI::line( '👤 🔴  Callback armed and ready' );
			} else {
				WP_CLI::line( '👤 🛟  Running in dry-run mode, callback is disarmed.' );
			}

			$posts_per_page = 100;
			$paged          = 1;
			$count          = 0;

			do {

				$args = array(
					'post_type'        => 'dataset',
					'posts_per_page'   => $posts_per_page,
					'paged'            => $paged,
					'suppress_filters' => false,
					'meta_query'       => array(
						array(
							'key'     => '_download_attachment_id',
							'compare' => 'NOT EXISTS',
						),
					),
				);

				$posts = get_posts( $args );

				foreach ( $posts as $post ) {
					if ( ! $dry_run ) {
						update_post_meta( $post->ID, '_dataset_file_missing', true );
					}
					++$count;
				}

				// Pause.
				WP_CLI::line( 'Pausing for a breath...' );
				sleep( 3 );

				// Free up memory.
				$this->vip_inmemory_cleanup();

				/*
				At this point, we have to decide whether to increase the value of $paged. In case a value which is being used for querying the posts (like post_status in our example) is being changed via the command, we should keep the WP_Query starting from the beginning in every iteration.
				* If the any value used for querying the posts is not being changed, then we need to update the value in order to walk through all the posts. */
				++$paged;
			} while ( count( $posts ) );

			if ( false === $dry_run ) {
				WP_CLI::success( sprintf( '%d datasets have successfully been identified as having missing files and had their metakeys updated.', $count ) );
			} else {
				WP_CLI::success( sprintf( '%d datasets will be identified as having missing files and have their metakeys updated.', $count ) );
			}

			// Trigger a term count as well as trigger bulk indexing of Elasticsearch site.
			$this->end_bulk_operation();
		}
	}

	WP_CLI::add_command( 'prc datasets', '\PRC\Platform\Datasets\CLI' );
}
