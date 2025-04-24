<?php
/**
 * The dataset blocks class.
 *
 * @package PRC\Platform
 */

namespace PRC\Platform\Datasets;

/**
 * The dataset blocks class.
 */
class Blocks {
	/**
	 * The loader object.
	 *
	 * @var object
	 */
	protected $loader;

	/**
	 * Constructor.
	 *
	 * @param object $loader The loader object.
	 */
	public function __construct( $loader ) {
		$this->loader = $loader;
		$this->init();
	}

	/**
	 * Initialize the class.
	 */
	public function init() {
		$this->loader->add_action( 'init', $this, 'block_init' );
		$this->loader->add_action( 'enqueue_block_editor_assets', $this, 'register_dataset_description_block' );
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
			$dataset         = \TDS\get_related_post( $dataset_term_id, 'datasets' );
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
		$block_json_file    = plugin_dir_path( __FILE__ ) . 'build/dataset-description-block/block.json';
		$block_json         = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		$editor_script      = register_block_script_handle( $block_json, 'editorScript' );
		wp_enqueue_script( $editor_script );
	}

	/**
	 * Register the dataset description block.
	 *
	 * @hook init
	 */
	public function block_init() {
		wp_register_block_metadata_collection(
			plugin_dir_path( __FILE__ ) . 'build',
			plugin_dir_path( __FILE__ ) . 'build/blocks-manifest.php'
		);

		register_block_bindings_source(
			'prc-platform/dataset-description',
			array(
				'label'              => __( 'Dataset Description', 'prc-platform' ),
				'get_value_callback' => array( $this, 'get_dataset_description_for_block_binding' ),
			)
		);
		register_block_type_from_metadata( __DIR__ . '/build/dataset-atp-legal-acceptance-block' );
		register_block_type_from_metadata( __DIR__ . '/build/download-block' );
	}
}
