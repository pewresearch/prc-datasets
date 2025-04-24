<?php
/**
 * The file that defines the internationalization functionality.
 *
 * @package PRC\Platform
 */

namespace PRC\Platform\Datasets;

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://sethrubenstein.info
 * @since      1.0.0
 *
 * @package    Datasets
 * @subpackage Datasets/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Datasets
 * @subpackage Datasets/includes
 * @author     Seth Rubenstein <srubenstein@pewresearch.org>
 */
class I18n {
	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'prc-datasets',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);
	}
}
