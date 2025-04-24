<?php
/**
 * The plugin bootstrap file
 *
 * @package PRC\Platform
 */

namespace PRC\Platform\Datasets;

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://sethrubenstein.info
 * @since             1.0.0
 * @package           PRC\Platform
 *
 * @wordpress-plugin
 * Plugin Name:       PRC Datasets
 * Plugin URI:        https://www.pewresearch.org
 * Description:       Provides Datasets functionality for PRC Platform, a hybrid post type that combines the features of a traditional post type with a taxonomy along with a digital rights management system for managing access to dataset files.
 * Version:           1.0.0
 * Author:            Seth Rubenstein
 * Author URI:        https://sethrubenstein.info/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       prc-datasets
 * Domain Path:       /languages
 * Requires Plugins:  prc-platform-core
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PRC_DATASETS_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-prc-datasets-activator.php
 */
function activate_prc_datasets() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-datasets-activator.php';
	Datasets_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-prc-datasets-deactivator.php
 */
function deactivate_prc_datasets() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-datasets-deactivator.php';
	Datasets_Deactivator::deactivate();
}

register_activation_hook( __FILE__, '\PRC\Platform\Datasets\activate_prc_datasets' );
register_deactivation_hook( __FILE__, '\PRC\Platform\Datasets\deactivate_prc_datasets' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-plugin.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_prc_datasets() {
	$plugin = new Plugin();
	$plugin->run();
}
run_prc_datasets();
