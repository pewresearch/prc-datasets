<?php
/**
 * Server render for the dataset download block.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

// Assume this is a singular dataset post.
$dataset_id = get_the_ID();
// But, usually, we're going to be viewing these from the perspective of the datasets taxonomy archive, so use that to get the dataset id.
if ( is_tax( Content_Type::$taxonomy_object_name ) ) {
	$dataset = \PRC\TDS\get_related_post( get_queried_object_id(), Content_Type::$taxonomy_object_name );
	if ( ! $dataset instanceof \WP_Post ) {
		return;
	}
	$dataset_id = $dataset->ID;
}
if ( 'dataset' !== get_post_type( $dataset_id ) ) {
	return;
}

echo render_dataset_download_ui( (int) $dataset_id, $content ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() plus inner block HTML; ATP modal when present.
