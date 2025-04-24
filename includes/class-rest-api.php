<?php
/**
 * The REST API for the datasets.
 *
 * @package PRC\Platform\Datasets
 */

namespace PRC\Platform\Datasets;

use WP_REST_Request;
use WP_Error;

/**
 * The REST API for the datasets.
 *
 * @package PRC\Platform\Datasets
 */
class Rest_API {
	/**
	 * The loader.
	 *
	 * @var Loader
	 */
	protected $loader;

	/**
	 * The constructor.
	 *
	 * @param Loader $loader The loader.
	 */
	public function __construct( $loader ) {
		$this->loader = $loader;
		$this->init();
	}

	/**
	 * Initialize the REST API.
	 */
	public function init() {
		$this->loader->add_filter( 'prc_api_endpoints', $this, 'register_dataset_endpoints' );
	}

	/**
	 * Registers the download endpoint. Checks the nonce against user credentials and
	 *
	 * @hook prc_api_endpoints
	 * @param array $endpoints The endpoints.
	 * @return array $endpoints The endpoints.
	 */
	public function register_dataset_endpoints( $endpoints ) {
		$get_download_endpoint = array(
			'route'               => 'datasets/get-download',
			'methods'             => 'POST',
			'args'                => array(
				'dataset_id' => array(
					'required' => true,
					'type'     => 'integer',
				),
			),
			'callback'            => array( $this, 'restfully_download_dataset' ),
			'permission_callback' => function ( WP_REST_Request $request ) {
				return true;
			},
		);

		$check_atp_endpoint = array(
			'route'               => 'datasets/check-atp',
			'methods'             => 'POST',
			'callback'            => array( $this, 'restfully_check_atp_acceptance' ),
			'permission_callback' => function ( WP_REST_Request $request ) {
				return true;
			},
		);

		$accept_atp_endpoint = array(
			'route'               => 'datasets/accept-atp',
			'methods'             => 'POST',
			'callback'            => array( $this, 'restfully_accept_atp' ),
			'permission_callback' => function ( WP_REST_Request $request ) {
				return true;
			},
		);

		$log_download_endpoint = array(
			'route'               => 'datasets/log-download',
			'methods'             => 'POST',
			'callback'            => array( $this, 'restfully_log_download' ),
			'args'                => array(
				'dataset_id' => array(
					'required' => true,
					'type'     => 'integer',
				),
			),
			'permission_callback' => function ( WP_REST_Request $request ) {
				$nonce = $request->get_header( 'X-WP-Nonce' );
				if ( empty( $nonce ) ) {
					return false;
				}
				return true;
			},
		);

		$download_stats_endpoint = array(
			'route'               => 'datasets/download-stats',
			'methods'             => 'GET',
			'callback'            => array( $this, 'restfully_get_download_stats' ),
			'args'                => array(
				'dataset_id' => array(
					'required' => true,
					'type'     => 'integer',
				),
			),
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		);

		array_push( $endpoints, $get_download_endpoint );
		array_push( $endpoints, $check_atp_endpoint );
		array_push( $endpoints, $accept_atp_endpoint );
		array_push( $endpoints, $log_download_endpoint );
		array_push( $endpoints, $download_stats_endpoint );
		return $endpoints;
	}

	/**
	 * Get the original blog id from the post meta.
	 *
	 * @param int $post_id The post id.
	 * @return int|null
	 */
	public static function legacy__get_original_blog_id( $post_id ) {
		$value = get_post_meta( $post_id, 'dt_original_blog_id', true );
		if ( is_numeric( $value ) ) {
			return intval( $value );
		} else {
			return null;
		}
	}

	/**
	 * Get the original post id from the post meta.
	 *
	 * @param int $post_id The post id.
	 * @return int|null
	 */
	public static function legacy__get_original_post_id( $post_id ) {
		$value = get_post_meta( $post_id, 'dt_original_post_id', true );
		if ( is_numeric( $value ) ) {
			return intval( $value );
		} else {
			return null;
		}
	}

	/**
	 * Get the original site slug based on the site id.
	 *
	 * @param int $site_id The site id.
	 * @return string
	 */
	protected static function legacy__get_original_site_slug( $site_id ) {
		switch ( $site_id ) {
			case 2:
				return '/global';
			case 3:
				return '/social-trends';
			case 4:
				return '/politics';
			case 5:
				return '/hispanic';
			case 7:
				return '/religion';
			case 8:
				return '/journalism';
			case 9:
				return '/internet';
			case 10:
				return '/methods';
			case 16:
				return '/science';
			case 18:
				return '/race-ethnicity';
			case 19:
				return '/decoded';
			default:
				return '';
		}
	}

	/**
	 * Simple function to return the original site rest route. Replaces the post id from the current rest route with the original post id.
	 *
	 * @param int    $post_id The post id.
	 * @param int    $original_post_id The original post id.
	 * @param string $rest_route The rest route.
	 * @return string
	 */
	protected static function legacy__get_original_rest_route( $post_id, $original_post_id, $rest_route ) {
		return str_replace( $post_id, $original_post_id, $rest_route );
	}

	/**
	 * Tries to find the download from the archive on legacy.pewresearch.org.
	 * Once it finds it, it will enqueue an action to save the download to the current dataset
	 * and return the download url for immediate download.
	 *
	 * @param int $dataset_id The dataset ID.
	 * @return string | WP_Error
	 */
	public function attempt_download_from_archive( $dataset_id ) {
		$original_blog_id = self::legacy__get_original_blog_id( $dataset_id );
		$original_post_id = self::legacy__get_original_post_id( $dataset_id );

		$original_site_slug = self::legacy__get_original_site_slug( $original_blog_id );

		$original_rest_route = rest_get_route_for_post( $dataset_id );
		$original_rest_route = self::legacy__get_original_rest_route(
			$dataset_id,
			$original_post_id,
			$original_rest_route
		);
		$rest_endpoint       = 'https://legacy.pewresearch.org' . $original_site_slug . '/wp-json' . $original_rest_route;

		$response = \vip_safe_wp_remote_get( $rest_endpoint );
		if ( is_wp_error( $response ) ) {
			return new WP_Error(
				'datasets/failed-to-get-original-dataset-from-archive',
				'Failed to get the original dataset from the legacy archive.',
				array(
					'status' => 500,
				)
			);
		}
		$data = wp_remote_retrieve_body( $response );
		if ( is_wp_error( $data ) ) {
			return $data;
		}
		$data = json_decode( $data, true );
		// We need to get one of the legacy dataset meta keys...
		// If we find it, we should prepare to return it, but also fire off ACS async action to save it to the current dataset, so we'll pass it the current dataset id and the new url for the media.
		$original_dataset_media_url = null;
		if ( array_key_exists( 'dataset_download_url', $data ) ) {
			$original_dataset_media_url = $data['dataset_download_url'];
		}
		if ( empty( $original_dataset_media_url ) ) {
			return new WP_Error(
				'datasets/failed-to-get-original-dataset-media-from-archive',
				'Failed to get the original dataset media from the legacy archive.',
				array(
					'status' => 500,
				)
			);
		}

		// Schedule a migration of the dataset media from legacy to live.
		as_enqueue_async_action(
			'prc_dataset_recovery',
			array(
				'dataset_id' => $dataset_id,
				'file_url'   => $original_dataset_media_url,
			),
			$dataset_id,
			true,
			5
		);

		// Return the original dataset media url, so that the user can download it immediately.
		return $original_dataset_media_url;
	}

	/**
	 * Restfully download a dataset.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function restfully_download_dataset( WP_REST_Request $request ) {
		$data  = json_decode( $request->get_body(), true );
		$nonce = array_key_exists( 'NONCE', $data ) ? $data['NONCE'] : null;
		if ( ! wp_verify_nonce( $nonce, 'prc_platform_dataset_download' ) ) {
			return new WP_Error(
				'invalid_nonce',
				'Invalid nonce.',
				array(
					'status' => 400,
					'data'   => $data,
				)
			);
		}
		if ( ! array_key_exists( 'uid', $data ) ) {
			return new WP_Error( 'no_uid', 'No UID provided.', array( 'status' => 400 ) );
		}
		$uid = $data['uid'];

		$id = $request->get_param( 'dataset_id' );
		if ( ! $id ) {
			return new WP_Error( 'no_id', 'No dataset ID provided.', array( 'status' => 400 ) );
		}
		$file_url      = null;
		$attachment_id = get_post_meta( $id, Content_Type::$download_meta_key, true );
		if ( $attachment_id ) {
			$file_url = wp_get_attachment_url( $attachment_id );
		}
		if ( ! $file_url || empty( $file_url ) ) {
			// If ultimately we can not get an attachment url, we should check the archive.
			$file_url = get_post_meta( $id, 'dataset_download_url', true );
			if ( ! $file_url || empty( $file_url ) ) {
				$file_url = $this->attempt_download_from_archive( $id );
			} else {
				$file_url = new WP_Error(
					'datasets/failed-to-get-file-url',
					'Failed to get the file url for the dataset.',
					array( 'status' => 500 )
				);
			}
		}

		if ( is_wp_error( $file_url ) ) {
			return rest_ensure_response(
				$file_url
			);
		} else {
			// Log the download.
			$this->increment_download_total( $id );
			$this->log_monthly_download_count( $id );
			$this->log_dataset_to_user( $uid, $id );
			return rest_ensure_response(
				array(
					'file_url' => $file_url,
				)
			);
		}
	}

	/**
	 * Restfully check the ATP acceptance.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function restfully_check_atp_acceptance( WP_REST_Request $request ) {
		$data  = json_decode( $request->get_body(), true );
		$nonce = array_key_exists( 'NONCE', $data ) ? $data['NONCE'] : null;
		if ( ! wp_verify_nonce( $nonce, 'prc_platform_dataset_download' ) ) {
			return new WP_Error( 'invalid_nonce', 'Invalid nonce.', array( 'status' => 400 ) );
		}
		if ( ! array_key_exists( 'uid', $data ) ) {
			return new WP_Error( 'no_uid', 'No UID provided.', array( 'status' => 400 ) );
		}
		$uid = $data['uid'];
		if ( ! class_exists( 'PRC\Platform\User_Accounts\User_Data' ) ) {
			return new WP_Error( 'no_user_accounts', 'User Accounts class not found.', array( 'status' => 400 ) );
		}
		$user = new \PRC\Platform\User_Accounts\User_Data( $uid, null );
		return rest_ensure_response( $user->check_atp() );
	}

	/**
	 * Restfully accept the ATP.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function restfully_accept_atp( WP_REST_Request $request ) {
		$data  = json_decode( $request->get_body(), true );
		$nonce = array_key_exists( 'NONCE', $data ) ? $data['NONCE'] : null;
		if ( ! wp_verify_nonce( $nonce, 'prc_platform_dataset_download' ) ) {
			return new WP_Error( 'invalid_nonce', 'Invalid nonce.', array( 'status' => 400 ) );
		}
		if ( ! array_key_exists( 'uid', $data ) ) {
			return new WP_Error( 'no_uid', 'No UID provided.', array( 'status' => 400 ) );
		}
		$uid = $data['uid'];
		if ( ! class_exists( 'PRC\Platform\User_Accounts\User_Data' ) ) {
			return new WP_Error( 'no_user_accounts', 'User Accounts class not found.', array( 'status' => 400 ) );
		}
		$user = new \PRC\Platform\User_Accounts\User_Data( $uid, null );
		return rest_ensure_response( $user->accept_atp() );
	}

	/**
	 * Register rest fields for dataset downloads logger.
	 *
	 * @hook rest_api_init
	 */
	public function register_field() {
		// Provide total downloads as a field on the dataset object.
		register_rest_field(
			Content_Type::$post_object_name,
			'_downloads',
			array(
				'get_callback' => array( $this, 'restfully_get_download_log' ),
				'schema'       => null,
			)
		);
	}

	/**
	 * Get the download log for a dataset object.
	 *
	 * @param mixed $object The object.
	 * @return (int|array)[]|(int|array)[]
	 */
	public function restfully_get_download_log( $object ) {
		$post_id = (int) $object['id'];

		$to_return = array(
			'total' => (int) get_post_meta( $post_id, '_total_downloads', true ),
			'log'   => array(),
		);

		$start_year   = 2020;
		$current_year = (int) gmdate( 'Y' );
		$years        = range( $start_year, $current_year );

		foreach ( $years as $year ) {
			$meta_key                  = '_downloads_' . $year;
			$to_return['log'][ $year ] = get_post_meta( $post_id, $meta_key, true );
		}

		return $to_return;
	}

	/**
	 * Restfully log a download for a dataset.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return array|WP_Error
	 */
	public function restfully_log_download( WP_REST_Request $request ) {
		if ( wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'WP_REST' ) === false ) {
			return new WP_Error( 'invalid_nonce', 'Invalid nonce.', array( 'status' => 403 ) );
		}
		$data = json_decode( $request->get_body(), true );
		if ( ! array_key_exists( 'uid', $data ) ) {
			return new WP_Error( 'no_uid', 'No UID provided.', array( 'status' => 400 ) );
		}
		$uid = $data['uid'];

		$id = $request->get_param( 'dataset_id' );
		if ( ! $id ) {
			return new WP_Error( 'no_dataset_id', 'No dataset ID provided.', array( 'status' => 400 ) );
		}

		$return = array();
		// We run through these without checking the prior return because we want to log as much as possible in the event of a failure. This way the total is incremented first, the truest number, then the monthyl count, then lastly the users personal log.
		$return['total']   = $this->increment_download_total( $id );
		$return['monthly'] = $this->log_monthly_download_count( $id );
		$return['uid']     = $this->log_dataset_to_user( $uid, $id );

		return $return;
	}

	/**
	 * Restfully get the download stats for a dataset.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return array|WP_Error
	 */
	public function restfully_get_download_stats( WP_REST_Request $request ) {

		$dataset_id = $request->get_param( 'dataset_id' );
		if ( ! $dataset_id ) {
			return new WP_Error( 'no_dataset_id', 'No dataset ID provided.', array( 'status' => 400 ) );
		}

		$cache_key   = 'dataset_downloads_' . $dataset_id;
		$cached_data = get_transient( $cache_key );

		if ( false !== $cached_data ) {
			return $cached_data;
		}

		$to_return = array(
			'total' => (int) get_post_meta( $dataset_id, '_total_downloads', true ),
			'log'   => array(),
		);

		$start_year   = 2020;
		$current_year = (int) gmdate( 'Y' );
		$years        = range( $start_year, $current_year );

		foreach ( $years as $year ) {
			$meta_key                  = '_downloads_' . $year;
			$to_return['log'][ $year ] = get_post_meta( $dataset_id, $meta_key, true );
		}

		set_transient( $cache_key, $to_return, DAY_IN_SECONDS );

		return $to_return;
	}
	/**
	 * Increment the total download count for a dataset.
	 *
	 * @param mixed $dataset_id The dataset ID.
	 * @return true|WP_Error
	 */
	public function increment_download_total( $dataset_id ) {
		$total = get_post_meta( $dataset_id, '_total_downloads', true );
		++$total;
		$updated = update_post_meta( $dataset_id, '_total_downloads', $total );

		if ( false !== $updated ) {
			return true;
		} else {
			return new WP_Error( 'datasets/could-not-increment-total', 'Unable to increment download total.', array( 'status' => 500 ) );
		}
	}

	/**
	 * Log a download for a dataset.
	 *
	 * @param mixed $dataset_id The dataset ID.
	 * @return true|WP_Error
	 */
	public function log_monthly_download_count( $dataset_id ) {
		$year     = wp_date( 'Y' );
		$month    = wp_date( 'm' );
		$meta_key = '_downloads_' . $year;

		$data = get_post_meta( $dataset_id, $meta_key, true );

		// Organize by date.
		if ( ! is_array( $data ) ) {
			$data = array();
		}

		if ( ! array_key_exists( $month, $data ) ) {
			$data[ $month ] = 1;
		}

		$data[ $month ] = $data[ $month ] + 1;

		$updated = update_post_meta( $dataset_id, $meta_key, $data );

		if ( false !== $updated ) {
			return true;
		} else {
			return new WP_Error( 'datasets/could-not-log-monthly', 'Unable to log monthly download data.', array( 'status' => 500 ) );
		}
	}

	/**
	 * Log a dataset to a user.
	 *
	 * @param mixed $uid The user ID.
	 * @param mixed $dataset_id The dataset ID.
	 * @return true|WP_Error
	 */
	public function log_dataset_to_user( $uid, $dataset_id ) {
		$user = new \PRC\Platform\User_Accounts\User_Data( $uid, null );

		$existing_data = $user->get_data();
		if ( is_wp_error( $existing_data ) ) {
			return rest_ensure_response( $existing_data );
		}
		$datasets = array_key_exists( 'datasets', $existing_data ) ? $existing_data['datasets'] : array();
		// Check for legacy data and upgrade.
		$upgrade_check = ! array_key_exists( 'v2', $datasets ) && ! empty( $datasets );
		if ( $upgrade_check ) {
			$datasets = array(
				'v1' => $datasets,
				'v2' => array(),
			);
		} elseif ( ! array_key_exists( 'v2', $datasets ) ) {
			$datasets['v2'] = array();
		}

		// Check for existing log, if it doesnt exist, add it, if it does, update the date.
		if ( ! in_array( $dataset_id, $datasets['v2'] ) ) {
			$datasets['v2'][ $dataset_id ] = array(
				'date'  => current_time( 'mysql' ),
				'url'   => get_permalink( $dataset_id ),
				'title' => get_the_title( $dataset_id ),
			);
		} else {
			$datasets['v2'][ $dataset_id ]['date'] = current_time( 'mysql' );
		}

		$new_datasets = $datasets;

		// Patch directly onto the user root, we replace datasets every time. In the future we could add a transformer to the get function that will get the titles and such so replacing is best.
		return $user->patch_data( $new_datasets, 'datasets' );
	}
}
