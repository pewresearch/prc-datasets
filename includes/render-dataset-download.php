<?php
/**
 * Shared frontend render helpers for dataset download blocks.
 *
 * @package PRC\Platform\Datasets
 */

declare(strict_types=1);

namespace PRC\Platform\Datasets;

/**
 * Resolve a dataset CPT post ID from a stored entity ID.
 *
 * `datasetId` is a dataset post ID. Older saves and URL paste can still store a
 * related `datasets` term ID. Term IDs and post IDs are independent sequences,
 * so a term ID may also match a different dataset post. Prefer the dataset post
 * when the ID is a dataset CPT, because the editor persists post IDs. Fall back
 * to Term Data Store only when the ID is not a dataset post.
 *
 * @param int $maybe_id Dataset post ID or datasets term ID.
 * @return int Dataset post ID, or 0 when it cannot be resolved.
 */
function resolve_dataset_post_id( int $maybe_id ): int {
	if ( $maybe_id <= 0 ) {
		return 0;
	}

	if ( 'dataset' === get_post_type( $maybe_id ) ) {
		return $maybe_id;
	}

	if ( ! function_exists( '\\PRC\\TDS\\get_related_post' ) ) {
		return 0;
	}

	$dataset = \PRC\TDS\get_related_post( $maybe_id, Content_Type::$taxonomy_object_name );
	if ( $dataset instanceof \WP_Post && 'dataset' === $dataset->post_type ) {
		return (int) $dataset->ID;
	}

	return 0;
}

/**
 * Render the interactive dataset download wrapper (ATP dialog + IAPI context).
 *
 * @param int    $dataset_id Dataset post ID.
 * @param string $content    Inner block HTML (usually a core/button).
 * @return string
 */
function render_dataset_download_ui( int $dataset_id, string $content ): string {
	wp_enqueue_script( 'wp-url' );
	wp_enqueue_script( 'wp-api-fetch' );
	wp_enqueue_script( 'firebase' );

	$is_atp = get_post_meta( $dataset_id, Content_Type::$atp_legal_key, true );
	// If this dataset is in the ATP then it needs a modal to accept the ATP legal terms. Here we're manually adding the content from the download block... usually a core/button into the trigger of the popup. Now, the button is still wired to the download block but the download block can handle opening the modal by accessing the modal's action store when running core/button::onButtonClick.
	if ( $is_atp ) {
		$modal   = \PRC\Platform\Blocks\Dialog\create_dialog(
			array(
				'title'           => 'Accept ATP Legal Terms',
				'content'         => '<!-- wp:prc-platform/dataset-atp-legal-acceptance {"datasetId": "' . $dataset_id . '"} -->',
				'backgroundColor' => 'ui-white',
				'trigger'         => $content,
			)
		);
		$content = null !== $modal ? render_block( $modal ) : $content;
	}

	$block_wrapper_attrs = get_block_wrapper_attributes(
		array(
			'data-wp-interactive'           => wp_json_encode(
				array(
					'namespace' => 'prc-platform/dataset-download',
				)
			),
			'data-wp-context'               => wp_json_encode(
				array(
					'datasetId'    => $dataset_id,
					'isProcessing' => false,
					'isError'      => false,
					'isSuccess'    => false,
					'isATP'        => $is_atp,
				)
			),
			'data-wp-bind--data-dataset-id' => 'context.datasetId',
			'data-wp-watch--is-processing'  => 'callbacks.isProcessing',
			'data-wp-watch--is-error'       => 'callbacks.isError',
			'data-wp-watch--is-success'     => 'callbacks.isSuccess',
		)
	);

	return wp_sprintf(
		'<div %1$s>%2$s</div>',
		$block_wrapper_attrs,
		$content
	);
}

/**
 * Wrap download markup in a Content Gate so logged-out visitors see the login form.
 *
 * @param string $download_html Interactive download wrapper HTML.
 * @return string
 */
function wrap_dataset_download_in_content_gate( string $download_html ): string {
	if ( ! class_exists( '\WP_Block_Type_Registry' ) ) {
		return $download_html;
	}

	$registry = \WP_Block_Type_Registry::get_instance();
	if ( ! $registry->is_registered( 'prc-user-accounts/content-gate' ) ) {
		return $download_html;
	}

	return render_block(
		array(
			'blockName'    => 'prc-user-accounts/content-gate',
			'attrs'        => array(),
			'innerBlocks'  => array(),
			'innerHTML'    => $download_html,
			'innerContent' => array( $download_html ),
		)
	);
}
