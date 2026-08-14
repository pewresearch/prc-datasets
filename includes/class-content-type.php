<?php
/**
 * The file that defines the content type for the plugin.
 *
 * @package PRC\Platform
 */

namespace PRC\Platform\Datasets;

use WP_Post;
use WP_Error;

/**
 * The file that defines the content type for the plugin.
 *
 * @package PRC\Platform
 */
class Content_Type {
	/**
	 * The loader.
	 *
	 * @var Datasets_Loader
	 */
	protected $loader;

	/**
	 * The name of the post object.
	 *
	 * @var string
	 */
	public static $post_object_name = 'dataset';

	/**
	 * The name of the taxonomy object.
	 *
	 * @var string
	 */
	public static $taxonomy_object_name = 'datasets';

	/**
	 * The meta key for the download attachment ID.
	 *
	 * @var string
	 */
	public static $download_meta_key = '_download_attachment_id';

	/**
	 * The meta key for a failed public download resolution (no file URL).
	 *
	 * @var string
	 */
	public static $download_unavailable_meta_key = '_download_unavailable';

	/**
	 * The meta key for the total downloads.
	 *
	 * @var string
	 */
	public static $total_downloads_meta_key = '_total_downloads';

	/**
	 * The meta key for if the dataset is under the ATP legal agreement.
	 *
	 * @var string
	 */
	public static $atp_legal_key = 'is_atp';

	/**
	 * Meta key for the timestamp when new underlying data was uploaded.
	 *
	 * Used to split monthly download analytics before/after that day.
	 *
	 * @var string
	 */
	public static $new_data_uploaded_meta_key = 'new_data_uploaded';

	/**
	 * Site-local date (Y-m-d) when day-level download logging begins.
	 *
	 * Midnight on July 31 → first day keys written on 2026-08-01.
	 *
	 * @var string
	 */
	public const DAY_LOGGING_START_DATE = '2026-08-01';

	/**
	 * Settings for the dataset post type.
	 *
	 * @var array
	 */
	public static $post_object_args = array(
		'labels'             => array(
			'name'                       => 'Datasets',
			'singular_name'              => 'Dataset',
			'add_new'                    => 'Add New',
			'add_new_item'               => 'Add New Dataset',
			'edit_item'                  => 'Edit Dataset',
			'new_item'                   => 'New Dataset',
			'all_items'                  => 'Datasets',
			'view_item'                  => 'View Dataset',
			'search_items'               => 'Search datasets',
			'not_found'                  => 'No dataset found',
			'not_found_in_trash'         => 'No dataset found in Trash',
			'parent_item_colon'          => '',
			'parent_item'                => 'Parent Item',
			'new_item_name'              => 'New Item Name',
			'separate_items_with_commas' => 'Separate items with commas',
			'add_or_remove_items'        => 'Add or remove items',
			'choose_from_most_used'      => 'Choose from the most used',
			'popular_items'              => 'Popular Items',
			'items_list'                 => 'Items list',
			'items_list_navigation'      => 'Items list navigation',
			'menu_name'                  => 'Datasets',
		),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_rest'       => true,
		'query_var'          => true,
		'rewrite'            => false,
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 10,
		'menu_icon'          => 'dashicons-download',
		'supports'           => array( 'title', 'editor', 'excerpt', 'revisions', 'prc-revisions', 'custom-fields' ),
	);

	/**
	 * Settings for the dataset taxonomy.
	 *
	 * @var array
	 */
	public static $taxonomy_object_args = array(
		'labels'            => array(
			'name'                       => 'Datasets',
			'singular_name'              => 'Dataset',
			'add_new'                    => 'Add New',
			'add_new_item'               => 'Add New Dataset',
			'edit_item'                  => 'Edit Dataset',
			'new_item'                   => 'New Dataset',
			'all_items'                  => 'Datasets',
			'view_item'                  => 'View Dataset',
			'search_items'               => 'Search datasets',
			'not_found'                  => 'No dataset found',
			'not_found_in_trash'         => 'No dataset found in Trash',
			'parent_item_colon'          => '',
			'parent_item'                => 'Parent Item',
			'new_item_name'              => 'New Item Name',
			'separate_items_with_commas' => 'Separate items with commas',
			'add_or_remove_items'        => 'Add or remove items',
			'choose_from_most_used'      => 'Choose from the most used',
			'popular_items'              => 'Popular Items',
			'items_list'                 => 'Items list',
			'items_list_navigation'      => 'Items list navigation',
			'menu_name'                  => 'Datasets',
		),
		'hierarchical'      => true,
		'public'            => true,
		'rewrite'           => array(
			'slug'         => 'dataset',
			'with_front'   => false,
			'hierarchical' => false,
		),
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_rest'      => true,
		'show_in_menu'      => true,
		'show_in_nav_menus' => false,
		'show_tagcloud'     => false,
	);

	/**
	 * The constructor.
	 *
	 * @param Datasets_Loader $loader The loader.
	 */
	public function __construct( $loader ) {
		$this->loader = $loader;
		$this->init();
	}

	/**
	 * Initialize the class.
	 */
	public function init() {
		$this->loader->add_action( 'init', $this, 'register_default_post_type_support', 5 );
		$this->loader->add_action( 'init', $this, 'register_term_data_store' );
		$this->loader->add_action( 'init', $this, 'archive_rewrites' );
		$this->loader->add_filter( 'post_type_archive_link', $this, 'filter_post_type_archive_link', 10, 2 );
		$this->loader->add_filter( 'prc_research_teams_rewrite_config', $this, 'register_research_teams_config' );
		$this->loader->add_action( 'admin_bar_menu', $this, 'modify_admin_bar_edit_link', 100 );
		$this->loader->add_filter( 'prc_platform_post_report_package_materials', $this, 'get_datasets_for_report_materials', 10, 2 );
		$this->loader->add_filter( 'prc_platform_pub_listing_default_args', $this, 'include_datasets_in_search', 10, 2 );
		$this->loader->add_action( 'pre_get_posts', $this, 'integrate_dataset_archive_with_elasticpress', 5, 1 );
	}

	/**
	 * Opt the dataset post-type archive into ElasticPress + pub-listing visibility.
	 *
	 * Dataset archives are excluded from isPubListingQuery (post_type_archive),
	 * so they need a dedicated EP opt-in and visibility defaults.
	 *
	 * @hook pre_get_posts
	 *
	 * @param \WP_Query $query The query.
	 */
	public function integrate_dataset_archive_with_elasticpress( $query ) {
		if ( is_admin() || ! $query->is_main_query() ) {
			return;
		}
		if ( ! $query->is_post_type_archive( self::$post_object_name ) ) {
			return;
		}

		$query->set( 'isPubListingQuery', true );
		$query->set( 'ep_integrate', true );

		$args = \PRC\Platform\Publication_Listing\Query::get_filtered_query_args( $query->query_vars, $query );
		// Keep the archive scoped to datasets.
		$args['post_type'] = array( self::$post_object_name );
		foreach ( $args as $key => $value ) {
			$query->set( $key, $value );
		}
	}

	/**
	 * Register default post type support for datasets.
	 *
	 * @hook init
	 */
	public function register_default_post_type_support() {
		add_post_type_support( 'post', 'prc-datasets' );
		add_post_type_support( 'feature', 'prc-datasets' );
		add_post_type_support( 'chart', 'prc-datasets' );
		// Add sitemap support for the dataset post type itself.
		add_post_type_support( self::$post_object_name, 'prc-sitemap' );
	}

	/**
	 * Get the enabled post types for the datasets taxonomy.
	 *
	 * @return array The enabled post types.
	 */
	public static function get_enabled_post_types() {
		$post_types      = get_post_types( array( 'public' => true ), 'names' );
		$supported_types = array_values(
			array_filter(
				$post_types,
				function ( $pt ) {
					return post_type_supports( $pt, 'prc-datasets' );
				}
			)
		);
		// Maintain backward compatibility with filter.
		$filter_types       = apply_filters( 'prc_platform__datasets_enabled_post_types', array() );
		$enabled_post_types = array_unique( array_merge( $supported_types, $filter_types ) );
		return array_values( $enabled_post_types );
	}

	/**
	 * Register the dataset post type and taxonomy and establish a relationship between them.
	 *
	 * @hook init
	 */
	public function register_term_data_store() {
		// Register the post type and taxonomy.
		register_post_type( self::$post_object_name, self::$post_object_args );
		$enabled_post_types = self::get_enabled_post_types();
		register_taxonomy( self::$taxonomy_object_name, $enabled_post_types, self::$taxonomy_object_args );

		// Establish a relationship between the post type and taxonomy.
		\PRC\TDS\add_relationship( self::$post_object_name, self::$taxonomy_object_name );

		// Register the post type's meta fields.
		$this->register_dataset_fields();
	}

	/**
	 * Register the dataset meta fields.
	 *
	 * @hook register_post_meta
	 */
	public function register_dataset_fields() {
		register_post_meta(
			self::$post_object_name,
			self::$download_meta_key,
			array(
				'description'   => 'Attachment ID for the dataset download.',
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'integer',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_post_meta(
			self::$post_object_name,
			self::$atp_legal_key,
			array(
				'description'   => 'Is this dataset under the ATP legal agreement?',
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_post_meta(
			self::$post_object_name,
			self::$download_unavailable_meta_key,
			array(
				'description'   => 'True when a public download request could not resolve a file URL.',
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_post_meta(
			self::$post_object_name,
			self::$total_downloads_meta_key,
			array(
				'description'   => 'Total downloads counter for a dataset.',
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'integer',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_post_meta(
			self::$post_object_name,
			self::$new_data_uploaded_meta_key,
			array(
				'description'   => 'Site-local datetime when new underlying dataset data was uploaded (for monthly analytics splits).',
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Whether day-level download logging is enabled for the current site-local day.
	 *
	 * @return bool
	 */
	public static function is_day_logging_enabled(): bool {
		return wp_date( 'Y-m-d' ) >= self::DAY_LOGGING_START_DATE;
	}

	/**
	 * Build the yearly daily-downloads meta key.
	 *
	 * @param int|string $year Four-digit year.
	 * @return string
	 */
	public static function get_daily_downloads_meta_key( $year ): string {
		return '_downloads_daily_' . $year;
	}

	/**
	 * Adds rewrite rules for the dataset archive.
	 *
	 * @hook init
	 */
	public function archive_rewrites() {
		$rules = array(
			'datasets/(\d\d\d\d)/page/?([0-9]{1,})/?$' => 'index.php?post_type=dataset&year=$matches[1]&paged=$matches[2]',
			'datasets/(\d\d\d\d)/?$'                   => 'index.php?post_type=dataset&year=$matches[1]',
			'datasets/page/?([0-9]{1,})/?$'             => 'index.php?post_type=dataset&paged=$matches[1]',
			'datasets/?$'                               => 'index.php?post_type=dataset',
		);
		foreach ( $rules as $rule => $query ) {
			add_rewrite_rule( $rule, $query, 'top' );
		}
	}

	/**
	 * Return the pretty /datasets/ archive URL.
	 *
	 * The dataset CPT registers `rewrite => false` (custom rules + research-team
	 * prefixes own routing), so core's `get_post_type_archive_link()` falls back
	 * to `?post_type=dataset`. Consumers (canonical, OG, schema, Parse.ly) should
	 * use the public path instead.
	 *
	 * @hook post_type_archive_link
	 *
	 * @param string $link      Archive permalink.
	 * @param string $post_type Post type name.
	 * @return string
	 */
	public function filter_post_type_archive_link( $link, $post_type ) {
		if ( self::$post_object_name !== $post_type ) {
			return $link;
		}
		return home_url( '/datasets/' );
	}

	/**
	 * Register dataset rewrite configuration for research team prefixed URLs.
	 *
	 * This provides the dataset URL patterns for research-team-prefixed URLs like
	 * /politics/dataset/american-trends-panel-wave-1/ instead of just /dataset/american-trends-panel-wave-1/.
	 *
	 * @hook prc_research_teams_rewrite_config
	 *
	 * @param array $config The rewrite configuration.
	 * @return array Modified configuration.
	 */
	public function register_research_teams_config( $config ) {
		$config['dataset'] = array(
			'slug_pattern'       => 'dataset/([^/]+)',
			'query_string'       => 'datasets=$matches[2]',
			'supports'           => array( 'iframe', 'embed', 'attachment' ),
			'attachment_pattern' => 'dataset/[^/]+/([^/]+)',
			'additional_rules'   => array(
				'datasets' => 'post_type=dataset',
			),
		);
		return $config;
	}

	/**
	 * Modifies the admin bar edit link to point to the dataset post edit link.
	 *
	 * @hook admin_bar_menu
	 *
	 * @param mixed $admin_bar The admin bar.
	 */
	public function modify_admin_bar_edit_link( $admin_bar ) {
		if ( ! is_tax( self::$taxonomy_object_name ) ) {
			return;
		}

		$term_id = get_queried_object()->term_id;
		// Get the associated post ID...
		$dataset_id = \PRC\TDS\get_related_post( $term_id, self::$taxonomy_object_name );

		if ( is_wp_error( $dataset_id ) ) {
			return;
		}

		$admin_bar->remove_menu( 'edit' );

		$link = get_edit_post_link( $dataset_id );

		if ( ! $link ) {
			return;
		}

		$admin_bar->add_menu(
			array(
				'parent' => false,
				'id'     => 'edit_dataset',
				'title'  => __( 'Edit Dataset' ),
				'href'   => $link,
				'meta'   => array(
					'title' => __( 'Edit Dataset' ),
				),
			)
		);
	}

	/**
	 * Gets the dataset terms for the given post and then constructs an array of dataset objects for inclusion in report materials.
	 *
	 * @hook prc_platform_post_report_package_materials
	 *
	 * @param array $materials The materials array.
	 * @param int   $post_id   The post ID.
	 * @return array The modified materials array.
	 */
	public function get_datasets_for_report_materials( $materials, $post_id ) {
		// get the dataset terms for this post...
		$datasets = wp_get_post_terms( $post_id, 'datasets' );
		if ( empty( $datasets ) || is_wp_error( $datasets ) ) {
			return $materials;
		}
		$datasets = array_map(
			function ( $dataset ) {
				return array(
					'type'  => 'dataset',
					'id'    => $dataset->term_id,
					'label' => $dataset->name,
					'url'   => get_term_link( $dataset ),
				);
			},
			$datasets
		);
		if ( ! empty( $datasets ) && ! empty( $materials ) && is_array( $materials ) ) {
			$materials = array_merge( $materials, $datasets );
		}
		return $materials;
	}

	/**
	 * Include datasets in search results.
	 *
	 * @hook prc_platform_pub_listing_default_args
	 *
	 * @param array    $query_args The query args.
	 * @param WP_Query $query      The query object.
	 * @return array The modified query args.
	 */
	public function include_datasets_in_search( $query_args, $query ) {
		// Add datasets post type to search results if the
		// search query if the user is searching.
		$search_term = $query_args['s'] ?? '';
		if ( is_string( $search_term ) && strlen( $search_term ) > 0 ) {
			$query_args['post_type'] = array_merge( $query_args['post_type'] ?? array(), array( 'dataset' ) );
		}
		return $query_args;
	}

}
