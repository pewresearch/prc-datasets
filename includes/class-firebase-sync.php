<?php
/**
 * Firebase Sync for ATP Dataset IDs
 *
 * Syncs ATP dataset IDs to Firebase for use by Cloud Functions.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

/**
 * Handles syncing ATP dataset IDs to Firebase.
 */
class Firebase_Sync {
	/**
	 * The loader.
	 *
	 * @var Loader
	 */
	protected $loader;

	/**
	 * Constructor.
	 *
	 * @param Loader $loader The loader instance.
	 */
	public function __construct( $loader ) {
		$this->loader = $loader;
		$this->init();
	}

	/**
	 * Initialize hooks.
	 */
	public function init() {
		if ( null === $this->loader ) {
			return;
		}

		// Sync ATP dataset IDs when a dataset is published or updated.
		$this->loader->add_action( 'prc_platform_on_publish', $this, 'sync_atp_dataset_ids' );
		$this->loader->add_action( 'prc_platform_on_update', $this, 'sync_atp_dataset_ids' );
		$this->loader->add_action( 'prc_platform_on_trash', $this, 'sync_atp_dataset_ids' );
		$this->loader->add_action( 'prc_platform_on_untrash', $this, 'sync_atp_dataset_ids' );
	}

	/**
	 * Get all ATP dataset post IDs.
	 *
	 * @return array Array of ATP dataset post IDs.
	 */
	public function get_atp_dataset_ids() {
		$atp_dataset_ids = array();
		$posts_per_page  = 100;
		$paged           = 1;

		do {
			$query_args = array(
				'post_type'        => Content_Type::$post_object_name,
				'posts_per_page'   => $posts_per_page,
				'paged'            => $paged,
				'post_status'      => 'publish',
				'fields'           => 'ids',
				'suppress_filters' => false,
				'meta_query'       => array(
					array(
						'key'     => Content_Type::$atp_legal_key,
						'value'   => '1',
						'compare' => '=',
					),
				),
			);

			$post_ids        = get_posts( $query_args );
			$atp_dataset_ids = array_merge( $atp_dataset_ids, $post_ids );

			++$paged;

		} while ( count( $post_ids ) === $posts_per_page );

		return $atp_dataset_ids;
	}

	/**
	 * Sync ATP dataset IDs to Firebase.
	 *
	 * This is called whenever a dataset is published, updated, trashed, or untrashed.
	 * It updates the config/atp-dataset-ids reference in Firebase which is used by
	 * Cloud Functions to compute user download statistics.
	 *
	 * @param object $post The post object (unused, but required by hook signature).
	 * @return bool|WP_Error True on success, WP_Error on failure.
	 */
	public function sync_atp_dataset_ids( $post = null ) {
		// Check if Firebase class exists.
		if ( ! class_exists( '\PRC\Platform\Firebase' ) ) {
			return new \WP_Error(
				'firebase_not_available',
				'Firebase class not found. Cannot sync ATP dataset IDs.'
			);
		}

		try {
			$firebase = new \PRC\Platform\Firebase( null );
			$db       = $firebase->db;

			if ( ! $db ) {
				return new \WP_Error(
					'firebase_db_not_available',
					'Firebase database connection not available.'
				);
			}

			$atp_ids = $this->get_atp_dataset_ids();

			// Sync to Firebase at config/atp-dataset-ids.
			$db->getReference( 'config/atp-dataset-ids' )->set( array_values( $atp_ids ) );

			do_action( 'qm/info', sprintf( 'Synced %d ATP dataset IDs to Firebase.', count( $atp_ids ) ) );

			return true;

		} catch ( \Exception $e ) {
			do_action( 'qm/error', 'Firebase sync error: ' . $e->getMessage() );

			return new \WP_Error(
				'firebase_sync_error',
				'Failed to sync ATP dataset IDs to Firebase: ' . $e->getMessage()
			);
		}
	}
}
