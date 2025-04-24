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
		$this->define_hooks();
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
		 * The class responsible for blocks.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'blocks/class-blocks.php';

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
	private function define_hooks() {
		new Content_Type( $this->get_loader() );
		new Rest_API( $this->get_loader() );
		new Blocks( $this->get_loader() );
		$this->loader->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_inspector_panel' );
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
	 * @hook wp_head
	 * @TODO: hook into yoast json ld filter.
	 */
	public function schema_ld_json() {
		$schema_json  = null;
		$schema_class = null;
		if ( is_tax( Content_Type::$taxonomy_object_name ) ) {
			$dataset_id = get_the_ID();
			// But, usually, we're going to be viewing these from the perspective of the datasets taxonomy archive, so use that to get the dataset id.
			if ( is_tax( 'datasets' ) ) {
				$dataset_term_id = get_queried_object_id();
				$dataset         = \TDS\get_related_post( $dataset_term_id, 'datasets' );
				$dataset_id      = $dataset->ID;
			}

			$schema_json  = get_post_meta( $dataset_id, Content_Type::$schema_key, true );
			$schema_class = 'dataset-schema-single';
		} elseif ( is_post_type_archive( Content_Type::$post_object_name ) ) {
			ob_start();
			?>
				{
					"@context" : "https://schema.org",
					"@id" : "https://www.pewresearch.org/datasets/",
					"@type" : "DataCatalog",
					"name" : "Pew Research Center - Datasets",
					"creator" : {
						"@type" : "Organization",
						"@id" : "https://www.pewresearch.org",
						"name" : "Pew Research Center"
					},
					"description" : "Pew Research Center makes the case-level microdata for much of its research available to the public for secondary analysis after a period of time.",
					"funder" : [
						{
						"@type" : "Organization",
						"@id" : "https://pewtrusts.org/",
						"name" : "Pew Charitable Trusts"
						},
						{
						"@type" : "Organization",
						"@id" : "https://www.templeton.org/",
						"name" : "John Templeton Foundation"
						}
					],
					"about" :[
						{
						"@id": "http://id.loc.gov/authorities/subjects/sh85112549"
						},
						{
						"name" : "religion data"
						},
						{
						"@id" : "http://id.loc.gov/authorities/subjects/sh85127580"
						},
						{
						"name" : "religion surveys"
						},
						{
						"@id" : "http://id.loc.gov/authorities/subjects/sh85124003",
						"name" : "social science surveys"
						},
						{
						"@id" : "http://id.loc.gov/authorities/subjects/sh85104459",
						"name": "political surveys"
						}
					],
					"genre" : [
						{"@id" : "http://id.loc.gov/authorities/genreForms/gf2014026059",
						"name" : "Census data"
						}
					]
				}
			<?php
			$schema_json  = ob_get_clean();
			$schema_class = 'dataset-schema-archive';
		}

		if ( $schema_json ) {
			echo wp_sprintf(
				'<script type="application/ld+json" class="%s">%s</script>',
				$schema_class,
				wp_kses_data( $schema_json ),
			);
		}
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
