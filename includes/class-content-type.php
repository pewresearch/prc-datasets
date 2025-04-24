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
	 * The meta key for the dataset schema.
	 *
	 * @var string
	 */
	public static $schema_key = 'dataset_schema';

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
		'supports'           => array( 'title', 'editor', 'excerpt', 'revisions', 'custom-fields' ),
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
		$this->loader->add_action( 'init', $this, 'register_term_data_store' );
		$this->loader->add_filter( 'prc_platform_rewrite_rules', $this, 'archive_rewrites' );
		$this->loader->add_filter( 'post_type_link', $this, 'modify_dataset_permalink', 20, 2 );
		$this->loader->add_action( 'admin_bar_menu', $this, 'modify_admin_bar_edit_link', 100 );
		$this->loader->add_filter( 'prc_platform_post_report_package_materials', $this, 'get_datasets_for_report_materials', 10, 2 );
		$this->loader->add_action( 'pre_get_posts', $this, 'include_datasets_in_search', 100, 1 );
		$this->loader->add_filter( 'prc_platform__facetwp_indexer_query_args', $this, 'include_datasets_in_facetwp_indexer_query_args', 10, 1 );
	}

	/**
	 * Register the dataset post type and taxonomy and establish a relationship between them.
	 *
	 * @hook init
	 * @uses prc_platform__datasets_enabled_post_types
	 */
	public function register_term_data_store() {
		// Register the post type and taxonomy.
		register_post_type( self::$post_object_name, self::$post_object_args );
		$enabled_post_types = array(
			'post',
			'feature',
			'chart',
		);
		$enabled_post_types = apply_filters( 'prc_platform__datasets_enabled_post_types', $enabled_post_types );
		register_taxonomy( self::$taxonomy_object_name, $enabled_post_types, self::$taxonomy_object_args );

		// Establish a relationship between the post type and taxonomy.
		\TDS\add_relationship( self::$post_object_name, self::$taxonomy_object_name );

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
			self::$schema_key,
			array(
				'description'   => 'Dataset schema.',
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
	 * Adds rewrite rules for the dataset archive.
	 *
	 * @hook prc_platform_rewrite_rules
	 *
	 * @param array $rewrite_rules The rewrite rules.
	 * @return array $rewrite_rules The modified rewrite rules.
	 */
	public function archive_rewrites( $rewrite_rules ) {
		return array_merge(
			$rewrite_rules,
			array(
				'datasets/(\d\d\d\d)/page/?([0-9]{1,})/?$' => 'index.php?post_type=dataset&year=$matches[1]&paged=$matches[2]',
			),
			array(
				'datasets/(\d\d\d\d)/?$' => 'index.php?post_type=dataset&year=$matches[1]',
			),
			array(
				'datasets/page/?([0-9]{1,})/?$' => 'index.php?post_type=dataset&paged=$matches[1]',
			),
			array(
				'datasets/?$' => 'index.php?post_type=dataset',
			),
		);
	}

	/**
	 * Modifies the dataset permalink to point to the datasets term archive permalink.
	 *
	 * @hook post_link
	 *
	 * @param string  $url  The URL of the post.
	 * @param WP_Post $post The post object.
	 * @return string The modified URL.
	 */
	public function modify_dataset_permalink( $url, $post ) {
		if ( 'publish' !== $post->post_status ) {
			return $url;
		}
		if ( self::$post_object_name === $post->post_type ) {
			// Get the matching term...
			$dataset_term = \TDS\get_related_term( $post->ID );
			if ( ! $dataset_term ) {
				return $url;
			}
			// Get the term link.
			$matched_url = get_term_link( $dataset_term, self::$taxonomy_object_name );
			if ( ! is_wp_error( $matched_url ) ) {
				return $matched_url;
			}
		}
		return $url;
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
		$dataset_id = \TDS\get_related_post( $term_id, self::$taxonomy_object_name );

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
	 * @hook pre_get_posts
	 *
	 * @param WP_Query $query The query object.
	 * @return void
	 */
	public function include_datasets_in_search( $query ) {
		// Add datasets post type to search results.
		if ( $query->is_main_query() && $query->is_search() ) {
			$query->set( 'post_type', array_merge( $query->get( 'post_type' ), array( 'dataset' ) ) );
		}
	}

	/**
	 * Include datasets in FacetWP indexer query args.
	 *
	 * This is an odd one. We do want to index datasets for faceting but we don't want them in the main query.
	 *
	 * @hook prc_platform__facetwp_indexer_query_args
	 *
	 * @param array $query_args The query args.
	 * @return array The modified query args.
	 */
	public function include_datasets_in_facetwp_indexer_query_args( $query_args ) {
		$query_args['post_type'] = array_merge( $query_args['post_type'], array( 'dataset' ) );
		return $query_args;
	}
}
