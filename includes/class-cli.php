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
