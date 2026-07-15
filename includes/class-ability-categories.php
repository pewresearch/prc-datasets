<?php
/**
 * Dataset ability category registration.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

/**
 * Registers the Datasets ability category for PRC dataset MCP tools.
 */
class Ability_Categories {

	/**
	 * Ability category slug used by prc-datasets/* abilities.
	 */
	public const CATEGORY = 'datasets';

	/**
	 * Constructor.
	 *
	 * @param Loader $loader Plugin loader.
	 */
	public function __construct( $loader ) {
		$loader->add_action( 'wp_abilities_api_categories_init', $this, 'register_categories' );
	}

	/**
	 * Register the Datasets ability category.
	 *
	 * @hook wp_abilities_api_categories_init
	 */
	public function register_categories() {
		if ( ! function_exists( 'wp_register_ability_category' ) ) {
			return;
		}

		if ( function_exists( 'wp_has_ability_category' ) && wp_has_ability_category( self::CATEGORY ) ) {
			return;
		}

		wp_register_ability_category(
			self::CATEGORY,
			array(
				'label'       => __( 'Datasets', 'prc-datasets' ),
				'description' => __( 'Abilities for dataset download analytics and file URL lookup.', 'prc-datasets' ),
			)
		);
	}
}
