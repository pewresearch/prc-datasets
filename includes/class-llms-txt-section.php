<?php
/**
 * Registers Datasets in /llms.txt.
 *
 * @package PRC\Platform\Datasets
 */

declare( strict_types=1 );

namespace PRC\Platform\Datasets;

use PRC\Platform\Markdown_For_Agents\LLMs_Txt;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Contributes the Datasets section.
 */
class Llms_Txt_Section {

	/**
	 * @param Loader $loader Loader instance.
	 */
	public function __construct( Loader $loader ) {
		unset( $loader );
		add_post_type_support( Content_Type::$post_object_name, 'prc-markdown-for-agents-llms-txt' );
		add_filter( 'prc_markdown_for_agents_llms_txt_sections', array( $this, 'register_section' ) );
	}

	/**
	 * @param array<int, array<string, mixed>> $sections Existing sections.
	 * @return array<int, array<string, mixed>>
	 */
	public function register_section( array $sections ): array {
		$links = $this->get_dataset_links();
		if ( empty( $links ) ) {
			return $sections;
		}

		$sections[] = array(
			'slug'        => 'datasets',
			'title'       => __( 'Datasets', 'prc-datasets' ),
			'description' => __( 'Survey datasets available from Pew Research Center.', 'prc-datasets' ),
			'links'       => $links,
		);

		return $sections;
	}

	/**
	 * @return array<int, array<string, string>>
	 */
	private function get_dataset_links(): array {
		$query = new \WP_Query(
			array(
				'post_type'              => Content_Type::$post_object_name,
				'post_status'            => 'publish',
				'posts_per_page'         => LLMs_Txt::SECTION_CAP + 1,
				'orderby'                => 'title',
				'order'                  => 'ASC',
				'no_found_rows'          => true,
				'update_post_meta_cache' => false,
				'update_post_term_cache' => false,
				'fields'                 => 'ids',
			)
		);

		$total = (int) $query->post_count;
		$links = array();

		foreach ( array_slice( $query->posts, 0, LLMs_Txt::SECTION_CAP ) as $post_id ) {
			$post = get_post( (int) $post_id );
			if ( ! $post instanceof \WP_Post ) {
				continue;
			}

			$permalink = get_permalink( $post );
			if ( ! $permalink ) {
				continue;
			}

			$excerpt = get_the_excerpt( $post );
			if ( '' !== $excerpt ) {
				$excerpt = wp_html_excerpt( wp_strip_all_tags( $excerpt ), 160, '…' );
			}

			$link = array(
				'title' => get_the_title( $post ),
				'url'   => $permalink,
			);
			if ( '' !== $excerpt ) {
				$link['description'] = $excerpt;
			}
			$links[] = $link;
		}

		$archive_url = home_url( '/datasets/' );

		return LLMs_Txt::maybe_append_see_all_link( $links, $total, $archive_url );
	}
}
