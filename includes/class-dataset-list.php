<?php
declare(strict_types=1);
/**
 * Datasets DataViews admin list screen.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

use WP_Post;
use WP_REST_Request;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the Datasets list on the shared shell and enriches rows/filters.
 */
class Dataset_List {
	/**
	 * Admin page slug for the DataViews list.
	 */
	public const PAGE_SLUG = 'prc-datasets-library';

	/**
	 * Script and style handle for the list provider.
	 */
	public const SCRIPT_HANDLE = 'prc-datasets-admin-dataview';

	/**
	 * Constructor.
	 *
	 * @param Loader $loader The loader.
	 */
	public function __construct( $loader ) {
		$loader->add_action( 'prc_wp_admin_dataview_register_lists', $this, 'register_list' );
		$loader->add_action( 'admin_enqueue_scripts', $this, 'enqueue_provider_assets', 20 );
		$loader->add_filter( 'prc_wp_admin_dataview_localize', $this, 'localize_provider', 10, 2 );
		$loader->add_filter( 'prc_wp_admin_dataview_shape_row', $this, 'shape_row', 10, 3 );
		$loader->add_filter( 'prc_wp_admin_dataview_query_args', $this, 'query_args', 10, 3 );
	}

	/**
	 * Register the dataset list with the shared DataViews shell.
	 *
	 * @param object $lists Shared list registry.
	 */
	public function register_list( $lists ): void {
		if ( ! is_object( $lists ) || ! method_exists( $lists, 'register' ) ) {
			return;
		}

		$lists->register(
			array(
				'postType'  => Content_Type::$post_object_name,
				'pageSlug'  => self::PAGE_SLUG,
				'menuTitle' => __( 'All Datasets', 'prc-datasets' ),
				'pageTitle' => __( 'All Datasets', 'prc-datasets' ),
				'duplicate' => array(
					'includeMeta' => array(
						Content_Type::$download_meta_key,
						Content_Type::$atp_legal_key,
						'dataset_download_url',
						'bylines',
						'acknowledgements',
						'displayBylines',
					),
				),
			)
		);
	}

	/**
	 * Add dataset filter options to the shell boot data.
	 *
	 * @param array  $localize Localized shell data.
	 * @param string $post_type Current post type.
	 * @return array
	 */
	public function localize_provider( $localize, $post_type ) {
		if ( Content_Type::$post_object_name !== $post_type ) {
			return $localize;
		}

		$localize['dataset'] = array(
			'zipStatuses'                 => self::get_zip_status_options(),
			'downloadUnavailableStatuses' => self::get_download_unavailable_status_options(),
		);

		return $localize;
	}

	/**
	 * Enqueue the dataset provider after the shared shell.
	 *
	 * @param string $hook_suffix Current admin hook.
	 */
	public function enqueue_provider_assets( $hook_suffix ): void {
		unset( $hook_suffix );

		if ( ! wp_script_is( 'prc-wp-admin-dataview', 'enqueued' ) ) {
			return;
		}

		$build_dir  = PRC_DATASETS_DIR . '/build/admin-dataview/';
		$asset_file = $build_dir . 'index.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = include $asset_file;

		wp_enqueue_script(
			self::SCRIPT_HANDLE,
			plugins_url( 'build/admin-dataview/index.js', PRC_DATASETS_FILE ),
			array_merge( $asset['dependencies'], array( 'prc-wp-admin-dataview' ) ),
			$asset['version'],
			true
		);

		if ( file_exists( $build_dir . 'style-index.css' ) ) {
			wp_enqueue_style(
				self::SCRIPT_HANDLE,
				plugins_url( 'build/admin-dataview/style-index.css', PRC_DATASETS_FILE ),
				array( 'wp-components' ),
				$asset['version']
			);
		}
	}

	/**
	 * Enrich rows with ZIP and download totals for list columns.
	 *
	 * @param array   $row       Row.
	 * @param WP_Post $post      Post.
	 * @param string  $post_type Post type.
	 * @return array
	 */
	public function shape_row( $row, $post, $post_type ) {
		if ( ! $post instanceof WP_Post || Content_Type::$post_object_name !== $post_type ) {
			return $row;
		}

		$attachment_id         = (int) get_post_meta( $post->ID, Content_Type::$download_meta_key, true );
		$has_zip               = $attachment_id > 0;
		$download_unavailable  = (bool) get_post_meta( $post->ID, Content_Type::$download_unavailable_meta_key, true );

		$row['hasZip']               = $has_zip ? '1' : '0';
		$row['downloadUnavailable']  = $download_unavailable ? '1' : '0';
		$row['totalDownloads']       = (int) get_post_meta( $post->ID, Content_Type::$total_downloads_meta_key, true );
		$row['isAtp']                = (bool) get_post_meta( $post->ID, Content_Type::$atp_legal_key, true );

		return $row;
	}

	/**
	 * Map ZIP / download-unavailable filters to WP_Query meta args.
	 *
	 * @param array           $query_args Query args.
	 * @param WP_REST_Request $request    Request.
	 * @param string          $post_type  Post type.
	 * @return array
	 */
	public function query_args( $query_args, $request, $post_type ) {
		if ( ! is_array( $query_args ) || Content_Type::$post_object_name !== $post_type ) {
			return $query_args;
		}

		if ( ! $request instanceof WP_REST_Request ) {
			return $query_args;
		}

		$meta_query = isset( $query_args['meta_query'] ) && is_array( $query_args['meta_query'] )
			? $query_args['meta_query']
			: array();

		$zip_status = (string) $request->get_param( 'zipStatus' );
		if ( '1' === $zip_status ) {
			$meta_query[] = array(
				'key'     => Content_Type::$download_meta_key,
				'value'   => array( '', '0' ),
				'compare' => 'NOT IN',
			);
		} elseif ( '0' === $zip_status ) {
			$meta_query[] = array(
				'relation' => 'OR',
				array(
					'key'     => Content_Type::$download_meta_key,
					'compare' => 'NOT EXISTS',
				),
				array(
					'key'     => Content_Type::$download_meta_key,
					'value'   => array( '', '0' ),
					'compare' => 'IN',
				),
			);
		}

		$download_unavailable = (string) $request->get_param( 'downloadUnavailable' );
		if ( '1' === $download_unavailable ) {
			$meta_query[] = array(
				'key'     => Content_Type::$download_unavailable_meta_key,
				'value'   => '1',
				'compare' => '=',
			);
		} elseif ( '0' === $download_unavailable ) {
			$meta_query[] = array(
				'relation' => 'OR',
				array(
					'key'     => Content_Type::$download_unavailable_meta_key,
					'compare' => 'NOT EXISTS',
				),
				array(
					'key'     => Content_Type::$download_unavailable_meta_key,
					'value'   => array( '', '0' ),
					'compare' => 'IN',
				),
			);
		}

		if ( ! empty( $meta_query ) ) {
			$query_args['meta_query'] = $meta_query;
		}

		return $query_args;
	}

	/**
	 * ZIP file filter options.
	 *
	 * @return array<int, array{value: string, label: string}>
	 */
	public static function get_zip_status_options(): array {
		return array(
			array(
				'value' => '1',
				'label' => __( 'Has ZIP file', 'prc-datasets' ),
			),
			array(
				'value' => '0',
				'label' => __( 'Missing ZIP file', 'prc-datasets' ),
			),
		);
	}

	/**
	 * Download unavailable filter options.
	 *
	 * @return array<int, array{value: string, label: string}>
	 */
	public static function get_download_unavailable_status_options(): array {
		return array(
			array(
				'value' => '1',
				'label' => __( 'Download unavailable', 'prc-datasets' ),
			),
			array(
				'value' => '0',
				'label' => __( 'Download available', 'prc-datasets' ),
			),
		);
	}
}
