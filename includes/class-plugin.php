<?php
/**
 * The file that defines the core plugin class.
 *
 * @package PRC\Platform
 */

namespace PRC\Platform\Datasets;

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://sethrubenstein.info
 * @since      1.0.0
 *
 * @package    Datasets
 * @subpackage Datasets/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Datasets
 * @subpackage Datasets/includes
 * @author     Seth Rubenstein <srubenstein@pewresearch.org>
 */
class Plugin {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Prc_Datasets_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'PRC_DATASETS_VERSION' ) ) {
			$this->version = PRC_DATASETS_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'prc-datasets';

		$this->load_dependencies();
		$this->set_locale();
		$this->init_dependencies();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Datasets_Loader. Orchestrates the hooks of the plugin.
	 * - Datasets_I18n. Defines internationalization functionality.
	 * - Datasets_Admin. Defines all hooks for the admin area.
	 * - Datasets_Blocks. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {
		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-i18n.php';

		/**
		 * The class responsible for defining the core content type and taxonomy relationships.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-content-type.php';

		/**
		 * The class responsible for defining the REST API.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-rest-api.php';

		/**
		 * The class responsible for CLI commands.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-cli.php';

		/**
		 * The class responsible for the build-audience CLI command.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-cli-build-audience.php';

		$this->loader = new Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Prc_Datasets_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {
		$plugin_i18n = new I18n();
		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function init_dependencies() {
		new Content_Type( $this->get_loader() );
		new Rest_API( $this->get_loader() );

		if ( class_exists( 'PRC\Platform\Markdown_For_Agents\LLMs_Txt' ) ) {
			require_once plugin_dir_path( __DIR__ ) . 'includes/class-llms-txt-section.php';
			new Llms_Txt_Section( $this->get_loader() );
		}

		wp_register_block_metadata_collection(
			plugin_dir_path( __DIR__ ) . 'build',
			plugin_dir_path( __DIR__ ) . 'build/blocks-manifest.php'
		);

		$this->loader->add_action( 'init', $this, 'block_init' );
		$this->loader->add_action( 'enqueue_block_editor_assets', $this, 'register_dataset_description_block' );
		$this->loader->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_inspector_panel' );
	}

	/**
	 * Get the dataset description for the block binding.
	 *
	 * @param array  $source_args The source arguments.
	 * @param object $block The block object.
	 * @param string $attribute_name The attribute name.
	 *
	 * @return string The dataset description.
	 */
	public function get_dataset_description_for_block_binding( $source_args, $block, $attribute_name ) {
		// Don't run this for anything other than the paragraph block.
		if ( 'core/paragraph' !== $block->name ) {
			return;
		}
		if ( is_tax( Content_Type::$taxonomy_object_name ) || is_singular( Content_Type::$post_object_name ) ) {
			$dataset_term_id = get_queried_object_id();
			$dataset         = \PRC\TDS\get_related_post( $dataset_term_id, 'datasets' );
			$dataset_id      = $dataset->ID;
		} else {
			$dataset_id = get_the_ID();
		}
		// Confirm the id in question is a dataset post type...
		if ( get_post_type( $dataset_id ) !== Content_Type::$post_object_name ) {
			return '';
		}
		$dataset_content = get_post_field( 'post_content', $dataset_id );
		$content         = apply_filters( 'the_content', $dataset_content );
		return $content;
	}

	/**
	 * Register the dataset description block.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function register_dataset_description_block() {
		$block_json_file    = plugin_dir_path( __DIR__ ) . 'build/dataset-description-block/block.json';
		$block_json         = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		$editor_script      = register_block_script_handle( $block_json, 'editorScript' );
		wp_enqueue_script( $editor_script );
	}

	/**
	 * Register blocks by registering block metadata collection.
	 *
	 * @hook init
	 */
	public function block_init() {
		register_block_bindings_source(
			'prc-platform/dataset-description',
			array(
				'label'              => __( 'Dataset Description', 'prc-platform' ),
				'get_value_callback' => array( $this, 'get_dataset_description_for_block_binding' ),
			)
		);
		register_block_type_from_metadata( plugin_dir_path( __DIR__ ) . 'build/dataset-atp-legal-acceptance-block' );
		register_block_type_from_metadata( plugin_dir_path( __DIR__ ) . 'build/download-block' );
	}

	/**
	 * Enqueue the inspector sidebar panel.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function enqueue_inspector_panel() {
		$screen = get_current_screen();
		if ( ! is_admin() || ! in_array( $screen->post_type, array( Content_Type::$post_object_name ) ) ) {
			return;
		}

		$asset_file = include plugin_dir_path( __FILE__ ) . '/inspector-sidebar-panel/build/index.asset.php';
		$asset_slug = 'prc-datasets-inspector-sidebar-panel';
		$script_src = plugin_dir_url( __FILE__ ) . '/inspector-sidebar-panel/build/index.js';
		$style_src  = plugin_dir_url( __FILE__ ) . '/inspector-sidebar-panel/build/index.css';

		wp_enqueue_script(
			$asset_slug,
			$script_src,
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_enqueue_style(
			$asset_slug,
			$style_src,
			array(),
			$asset_file['version']
		);
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}
}
