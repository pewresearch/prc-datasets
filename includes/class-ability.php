<?php
/**
 * Dataset abilities for the WP Abilities API / MCP.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

use WP_Error;

/**
 * Registers prc-datasets analytics and download-url abilities.
 */
class Ability {

	/**
	 * Plugin file used to validate activation on the target site.
	 *
	 * @var string
	 */
	private const PLUGIN_FILE = 'prc-datasets/prc-datasets.php';

	/**
	 * Analytics ability name.
	 *
	 * @var string
	 */
	public static $ability_name = 'prc-datasets/get-analytics';

	/**
	 * Download URL ability name.
	 *
	 * @var string
	 */
	public static $download_url_ability_name = 'prc-datasets/get-download-url';

	/**
	 * Constructor.
	 *
	 * @param Loader $loader Loader instance for hook registration.
	 */
	public function __construct( $loader ) {
		$loader->add_action( 'wp_abilities_api_init', $this, 'register_ability' );
	}

	/**
	 * Register dataset abilities.
	 *
	 * @hook wp_abilities_api_init
	 */
	public function register_ability() {
		if ( ! function_exists( 'wp_register_ability' ) ) {
			return;
		}

		$this->register_analytics_ability();
		$this->register_download_url_ability();
	}

	/**
	 * Register the dataset analytics ability.
	 */
	private function register_analytics_ability() {
		wp_register_ability(
			self::$ability_name,
			array(
				'label'               => __( 'Get dataset download analytics', 'prc-datasets' ),
				'description'         => __( 'Returns download analytics for a dataset post ID: all-time total and yearly/monthly download counts.', 'prc-datasets' ),
				'category'            => Ability_Categories::CATEGORY,
				'input_schema'        => array(
					'type'                 => 'object',
					'required'             => array( 'post_id' ),
					'additionalProperties' => false,
					'properties'           => array(
						'post_id' => array(
							'type'        => 'integer',
							'description' => 'Dataset post ID.',
							'minimum'     => 1,
						),
						'site_id' => \PRC\Platform\AI\Utils\site_id_input_schema_property(),
					),
				),
				'output_schema'       => array(
					'type'       => 'object',
					'properties' => array(
						'post_id' => array(
							'type'        => 'integer',
							'description' => 'Dataset post ID.',
						),
						'title'   => array(
							'type'        => 'string',
							'description' => 'Dataset title.',
						),
						'total'   => array(
							'type'        => 'integer',
							'description' => 'All-time download count.',
						),
						'log'     => array(
							'type'        => 'object',
							'description' => 'Yearly download log keyed by year, each value an object of month => count.',
						),
					),
				),
				'execute_callback'    => array( $this, 'execute' ),
				'permission_callback' => array( $this, 'can_get_analytics' ),
				'meta'                => array(
					'annotations'  => array(
						'instructions' => 'Pass a dataset post_id to retrieve download totals and the yearly/monthly download log. Optionally pass site_id to run against a specific multisite blog; defaults to the content site (20). If this plugin is inactive on the target site, the ability returns plugin_inactive_on_site. Use vip/content-search with subtype=dataset to find dataset IDs first. Requires edit access to the dataset.',
						'readonly'     => true,
						'destructive'  => false,
						'idempotent'   => true,
					),
					'show_in_rest' => true,
					'mcp'          => array(
						'public' => true,
						'type'   => 'tool',
					),
				),
			)
		);
	}

	/**
	 * Register the dataset download URL ability.
	 */
	private function register_download_url_ability() {
		wp_register_ability(
			self::$download_url_ability_name,
			array(
				'label'               => __( 'Get dataset download file URL', 'prc-datasets' ),
				'description'         => __( 'Returns the downloadable file URL for a dataset post ID (media attachment or legacy stored URL). Does not increment download counters. Requires Author-level access and edit permission on the dataset.', 'prc-datasets' ),
				'category'            => Ability_Categories::CATEGORY,
				'input_schema'        => array(
					'type'                 => 'object',
					'required'             => array( 'post_id' ),
					'additionalProperties' => false,
					'properties'           => array(
						'post_id' => array(
							'type'        => 'integer',
							'description' => 'Dataset post ID.',
							'minimum'     => 1,
						),
						'site_id' => \PRC\Platform\AI\Utils\site_id_input_schema_property(),
					),
				),
				'output_schema'       => array(
					'type'       => 'object',
					'properties' => array(
						'post_id'       => array(
							'type'        => 'integer',
							'description' => 'Dataset post ID.',
						),
						'title'         => array(
							'type'        => 'string',
							'description' => 'Dataset title.',
						),
						'file_url'      => array(
							'type'        => 'string',
							'description' => 'Direct download URL for the dataset file.',
						),
						'attachment_id' => array(
							'type'        => 'integer',
							'description' => 'Media library attachment ID when the file is attached; omit or 0 for legacy URL-only datasets.',
						),
					),
				),
				'execute_callback'    => array( $this, 'execute_get_download_url' ),
				'permission_callback' => array( $this, 'can_get_download_url' ),
				'meta'                => array(
					'annotations'  => array(
						'instructions' => 'Pass a dataset post_id to retrieve the downloadable file URL without logging a download. Optionally pass site_id to run against a specific multisite blog; defaults to the content site (20). If this plugin is inactive on the target site, the ability returns plugin_inactive_on_site. Requires Author role or higher (publish_posts) and edit_post on the dataset. Does not attempt legacy archive recovery.',
						'readonly'     => true,
						'destructive'  => false,
						'idempotent'   => true,
					),
					'show_in_rest' => true,
					'mcp'          => array(
						'public' => true,
						'type'   => 'tool',
					),
				),
			)
		);
	}

	/**
	 * Permission check for analytics ability.
	 *
	 * @param array|null $input Ability input.
	 * @return bool|WP_Error
	 */
	public function can_get_analytics( $input = null ) {
		return $this->with_site(
			$input,
			function () use ( $input ) {
				if ( ! is_array( $input ) || empty( $input['post_id'] ) ) {
					return current_user_can( 'edit_posts' );
				}

				$post_id = absint( $input['post_id'] );
				return $post_id > 0 && current_user_can( 'edit_post', $post_id );
			}
		);
	}

	/**
	 * Permission check for download URL ability (Author+ and edit_post).
	 *
	 * @param array|null $input Ability input.
	 * @return bool|WP_Error
	 */
	public function can_get_download_url( $input = null ) {
		return $this->with_site(
			$input,
			function () use ( $input ) {
				if ( ! current_user_can( 'publish_posts' ) ) {
					return false;
				}

				if ( ! is_array( $input ) || empty( $input['post_id'] ) ) {
					return true;
				}

				$post_id = absint( $input['post_id'] );
				return $post_id > 0 && current_user_can( 'edit_post', $post_id );
			}
		);
	}

	/**
	 * Execute callback for prc-datasets/get-analytics.
	 *
	 * @param array $input Ability input.
	 * @return array|WP_Error
	 */
	public function execute( $input ) {
		return $this->with_site(
			$input,
			function () use ( $input ) {
				$post_id = isset( $input['post_id'] ) ? absint( $input['post_id'] ) : 0;
				if ( $post_id < 1 ) {
					return new WP_Error(
						'missing_post_id',
						__( 'post_id is required.', 'prc-datasets' ),
						array( 'status' => 400 )
					);
				}

				$post = get_post( $post_id );
				if ( ! $post || 'dataset' !== $post->post_type ) {
					return new WP_Error(
						'invalid_dataset',
						__( 'Post not found or is not a dataset.', 'prc-datasets' ),
						array( 'status' => 404 )
					);
				}

				if ( ! current_user_can( 'edit_post', $post_id ) ) {
					return new WP_Error(
						'rest_forbidden',
						__( 'You are not allowed to view analytics for this dataset.', 'prc-datasets' ),
						array( 'status' => 403 )
					);
				}

				$stats = Rest_API::get_download_stats( $post_id );

				return array(
					'post_id' => $post_id,
					'title'   => get_the_title( $post ),
					'total'   => (int) ( $stats['total'] ?? 0 ),
					'log'     => is_array( $stats['log'] ?? null ) ? $stats['log'] : array(),
				);
			}
		);
	}

	/**
	 * Execute callback for prc-datasets/get-download-url.
	 *
	 * @param array $input Ability input.
	 * @return array|WP_Error
	 */
	public function execute_get_download_url( $input ) {
		return $this->with_site(
			$input,
			function () use ( $input ) {
				$post_id = isset( $input['post_id'] ) ? absint( $input['post_id'] ) : 0;
				if ( $post_id < 1 ) {
					return new WP_Error(
						'missing_post_id',
						__( 'post_id is required.', 'prc-datasets' ),
						array( 'status' => 400 )
					);
				}

				$post = get_post( $post_id );
				if ( ! $post || 'dataset' !== $post->post_type ) {
					return new WP_Error(
						'invalid_dataset',
						__( 'Post not found or is not a dataset.', 'prc-datasets' ),
						array( 'status' => 404 )
					);
				}

				if ( ! current_user_can( 'publish_posts' ) || ! current_user_can( 'edit_post', $post_id ) ) {
					return new WP_Error(
						'rest_forbidden',
						__( 'You are not allowed to get the download URL for this dataset.', 'prc-datasets' ),
						array( 'status' => 403 )
					);
				}

				$resolved = Rest_API::resolve_download_file_url( $post_id );
				if ( is_wp_error( $resolved ) ) {
					return $resolved;
				}

				return array(
					'post_id'       => $post_id,
					'title'         => get_the_title( $post ),
					'file_url'      => $resolved['file_url'],
					'attachment_id' => null !== $resolved['attachment_id'] ? (int) $resolved['attachment_id'] : 0,
				);
			}
		);
	}

	/**
	 * Run a callback on the requested target site.
	 *
	 * @param array|null $input    Ability input.
	 * @param callable   $callback Callback to run after site validation/switching.
	 * @return mixed
	 */
	private function with_site( $input, callable $callback ) {
		return \PRC\Platform\AI\Utils\with_site(
			\PRC\Platform\AI\Utils\resolve_site_id( is_array( $input ) ? $input : null ),
			self::PLUGIN_FILE,
			$callback
		);
	}
}
