<?php
declare(strict_types=1);
/**
 * Admin list-table filter for the dataset post type.
 *
 * Adds a "ZIP file" dropdown to the Datasets list screen so editors can quickly
 * surface datasets that are missing an attached download file.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

use WP_Query;

/**
 * Adds a filter dropdown to the dataset list table for filtering by whether
 * the dataset has an associated ZIP/download attachment.
 */
class Admin_Filter {
	/**
	 * Query var used to carry the filter selection between request and query.
	 *
	 * @var string
	 */
	private const FILTER_VAR = 'dataset_zip_status';

	/**
	 * Constructor.
	 *
	 * @param object $loader The plugin loader.
	 */
	public function __construct( $loader ) {
		$loader->add_action( 'restrict_manage_posts', $this, 'render_filter_dropdown' );
		$loader->add_filter( 'parse_query', $this, 'apply_filter_to_query' );
	}

	/**
	 * Renders the ZIP-file status dropdown on the dataset list screen.
	 *
	 * @hook restrict_manage_posts
	 *
	 * @param string $post_type The current post type.
	 */
	public function render_filter_dropdown( string $post_type ): void {
		if ( Content_Type::$post_object_name !== $post_type ) {
			return;
		}

		$selected = sanitize_key( $_GET[ self::FILTER_VAR ] ?? '' );

		$options = array(
			''         => __( 'All datasets', 'prc-datasets' ),
			'has_zip'  => __( 'Has ZIP file', 'prc-datasets' ),
			'no_zip'   => __( 'Missing ZIP file', 'prc-datasets' ),
		);

		echo '<select name="' . esc_attr( self::FILTER_VAR ) . '" id="' . esc_attr( self::FILTER_VAR ) . '">';
		foreach ( $options as $value => $label ) {
			printf(
				'<option value="%s"%s>%s</option>',
				esc_attr( $value ),
				selected( $selected, $value, false ),
				esc_html( $label )
			);
		}
		echo '</select>';
	}

	/**
	 * Modifies the WP_Query to apply the selected ZIP-file filter.
	 *
	 * @hook parse_query
	 *
	 * @param WP_Query $query The current query object.
	 */
	public function apply_filter_to_query( WP_Query $query ): void {
		if ( ! is_admin() || ! $query->is_main_query() ) {
			return;
		}

		if ( Content_Type::$post_object_name !== ( $query->query['post_type'] ?? '' ) ) {
			return;
		}

		$filter = sanitize_key( $_GET[ self::FILTER_VAR ] ?? '' );

		if ( 'has_zip' === $filter ) {
			$query->set(
				'meta_query',
				array(
					array(
						'key'     => Content_Type::$download_meta_key,
						'value'   => array( '', '0' ),
						'compare' => 'NOT IN',
					),
				)
			);
			return;
		}

		if ( 'no_zip' === $filter ) {
			$query->set(
				'meta_query',
				array(
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
				)
			);
		}
	}
}
