<?php
/**
 * Server render for the dataset download button block.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

$dataset_id = array_key_exists( 'datasetId', $attributes )
	? absint( $attributes['datasetId'] )
	: 0;
$dataset_id = resolve_dataset_post_id( $dataset_id );
if ( $dataset_id <= 0 ) {
	return;
}

$download_html = render_dataset_download_ui( $dataset_id, $content );

echo wrap_dataset_download_in_content_gate( $download_html ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- interactive download markup plus optional content-gate wrapper.
