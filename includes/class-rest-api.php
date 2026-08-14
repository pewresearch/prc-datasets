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
		$this->loader->add_action( 'rest_api_init', $this, 'register_dataset_endpoints' );
		$this->loader->add_action( 'updated_post_meta', $this, 'maybe_invalidate_stats_on_meta_change', 10, 4 );
		$this->loader->add_action( 'added_post_meta', $this, 'maybe_invalidate_stats_on_meta_change', 10, 4 );
		$this->loader->add_action( 'deleted_post_meta', $this, 'maybe_invalidate_stats_on_meta_delete', 10, 4 );
	}

	/**
	 * Enforce per-IP rate limiting for dataset download endpoints.
	 *
	 * @param string $endpoint_key Unique key for this endpoint bucket.
	 * @return true|WP_Error
	 */
	private function enforce_ip_rate_limit( string $endpoint_key ) {
		if ( ! function_exists( '\\PRC\\Platform\\rate_limit_hit' ) ) {
			return true;
		}

		$ip = function_exists( '\\PRC\\Platform\\get_client_ip' )
			? \PRC\Platform\get_client_ip()
			: '';

		if ( '' === $ip ) {
			return true;
		}

		if ( \PRC\Platform\rate_limit_hit(
			'datasets_' . $endpoint_key . '_' . md5( $ip ),
			30,
			MINUTE_IN_SECONDS,
			'prc_datasets_throttle'
		) ) {
			return new WP_Error(
				'rate_limited',
				'Too many requests. Please try again later.',
				array( 'status' => 429 )
			);
		}

		return true;
	}

	/**
	 * @hook rest_api_init
	 */
	public function register_dataset_endpoints() {
		register_rest_route(
			'prc-api/v3',
			'datasets/get-download',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'restfully_download_dataset' ),
				'args'                => array(
					'dataset_id' => array(
						'required' => true,
						'type'     => 'integer',
					),
				),
				'permission_callback' => function ( WP_REST_Request $request ) {
					return true;
				},
			)
		);
		register_rest_route(
			'prc-api/v3',
			'datasets/check-atp',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'restfully_check_atp_acceptance' ),
				'args'                => array(),
				'permission_callback' => function ( WP_REST_Request $request ) {
					return true;
				},
			)
		);
		register_rest_route(
			'prc-api/v3',
			'datasets/accept-atp',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'restfully_accept_atp' ),
				'args'                => array(),
				'permission_callback' => function ( WP_REST_Request $request ) {
					return true;
				},
			)
		);
		register_rest_route(
			'prc-api/v3',
			'datasets/log-download',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'restfully_log_download' ),
				'args'                => array(
					'dataset_id' => array(
						'required' => true,
						'type'     => 'integer',
					),
				),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'prc-api/v3',
			'datasets/download-stats',
			array(
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
			)
		);
		register_rest_route(
			'prc-api/v3',
			'datasets/audiences',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'restfully_list_audiences' ),
					'args'                => array(
						'dataset_id' => array(
							'required' => true,
							'type'     => 'integer',
						),
					),
					'permission_callback' => array( $this, 'can_edit_dataset_from_request' ),
				),
				array(
					'methods'             => 'DELETE',
					'callback'            => array( $this, 'restfully_delete_audience' ),
					'args'                => array(
						'dataset_id'   => array(
							'required' => true,
							'type'     => 'integer',
						),
						'verification' => array(
							'required' => false,
							'type'     => 'string',
						),
						'key'          => array(
							'required' => false,
							'type'     => 'string',
						),
					),
					'permission_callback' => array( $this, 'can_edit_dataset_from_request' ),
				),
			)
		);
		register_rest_route(
			'prc-api/v3',
			'datasets/build-audience',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'restfully_build_audience' ),
				'args'                => array(
					'dataset_id'   => array(
						'required' => true,
						'type'     => 'integer',
					),
					'verification' => array(
						'required' => false,
						'type'     => 'string',
						'default'  => 'verified',
					),
				),
				'permission_callback' => array( $this, 'can_edit_dataset_from_request' ),
			)
		);
	}

	/**
	 * Whether the current user can edit the dataset named in the request.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return bool
	 */
	public function can_edit_dataset_from_request( $request ): bool {
		$dataset_id = (int) $request->get_param( 'dataset_id' );
		return $dataset_id > 0 && current_user_can( 'edit_post', $dataset_id );
	}

	/**
	 * GET datasets/audiences
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function restfully_list_audiences( $request ) {
		$dataset_id = (int) $request->get_param( 'dataset_id' );
		$post       = get_post( $dataset_id );
		if ( ! $post || Content_Type::$post_object_name !== $post->post_type ) {
			return new \WP_Error(
				'invalid_dataset',
				'Dataset not found.',
				array( 'status' => 404 )
			);
		}

		return rest_ensure_response( Audience_Service::list_for_dataset( $dataset_id ) );
	}

	/**
	 * POST datasets/build-audience
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function restfully_build_audience( $request ) {
		$dataset_id   = (int) $request->get_param( 'dataset_id' );
		$verification = (string) ( $request->get_param( 'verification' ) ?: 'verified' );

		$result = Audience_Service::build( $dataset_id, $verification );
		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return rest_ensure_response( $result );
	}

	/**
	 * DELETE datasets/audiences
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function restfully_delete_audience( $request ) {
		$dataset_id   = (int) $request->get_param( 'dataset_id' );
		$verification = $request->get_param( 'verification' );
		$key          = $request->get_param( 'key' );

		if ( empty( $verification ) && empty( $key ) ) {
			return new \WP_Error(
				'missing_audience_identity',
				'Provide verification or key.',
				array( 'status' => 400 )
			);
		}

		$result = Audience_Service::delete(
			$dataset_id,
			is_string( $verification ) ? $verification : null,
			is_string( $key ) ? $key : null
		);
		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return rest_ensure_response( $result );
	}

	/**
	 * Resolve the download file URL for a dataset.
	 *
	 * Looks up the media library attachment, then the legacy dataset_download_url meta.
	 * When $record_unavailable is true, stamps or clears `_download_unavailable` meta.
	 *
	 * @param int  $dataset_id         Dataset post ID.
	 * @param bool $record_unavailable Whether to stamp/clear download-unavailable meta.
	 * @return array{file_url: string, attachment_id: int|null}|WP_Error
	 */
	public static function resolve_download_file_url( int $dataset_id, bool $record_unavailable = false ) {
		$attachment_id = get_post_meta( $dataset_id, Content_Type::$download_meta_key, true );
		$attachment_id = $attachment_id ? (int) $attachment_id : null;
		$file_url      = null;

		if ( $attachment_id ) {
			$file_url = wp_get_attachment_url( $attachment_id );
		}

		if ( empty( $file_url ) ) {
			$attachment_id = null;
			$file_url      = get_post_meta( $dataset_id, 'dataset_download_url', true );
		}

		if ( empty( $file_url ) || ! is_string( $file_url ) ) {
			if ( $record_unavailable ) {
				update_post_meta( $dataset_id, Content_Type::$download_unavailable_meta_key, true );
			}
			return new WP_Error(
				'datasets/failed-to-get-file-url',
				'Failed to get the file url for the dataset.',
				array( 'status' => 404 )
			);
		}

		if ( $record_unavailable ) {
			delete_post_meta( $dataset_id, Content_Type::$download_unavailable_meta_key );
		}

		return array(
			'file_url'      => $file_url,
			'attachment_id' => $attachment_id,
		);
	}

	/**
	 * Restfully download a dataset.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function restfully_download_dataset( WP_REST_Request $request ) {
		$throttled = $this->enforce_ip_rate_limit( 'get_download' );
		if ( is_wp_error( $throttled ) ) {
			return $throttled;
		}

		$auth = \PRC\Platform\User_Accounts\extract_user_auth_from_request( $request );
		if ( is_wp_error( $auth ) ) {
			return $auth;
		}
		$uid   = $auth['uid'];
		$token = $auth['token'];

		$id = $request->get_param( 'dataset_id' );
		if ( ! $id ) {
			return new WP_Error( 'no_id', 'No dataset ID provided.', array( 'status' => 400 ) );
		}

		$id = (int) $id;
		if ( Content_Type::$post_object_name !== get_post_type( $id ) ) {
			return new WP_Error(
				'invalid_dataset',
				'Post not found or is not a dataset.',
				array( 'status' => 404 )
			);
		}

		$resolved = self::resolve_download_file_url( $id, true );
		if ( is_wp_error( $resolved ) ) {
			return rest_ensure_response( $resolved );
		}

		$file_url = $resolved['file_url'];

		// Log the download.
		$this->increment_download_total( $id );
		$this->log_monthly_download_count( $id );
		$this->log_dataset_to_user( $uid, $id, $token );
		return rest_ensure_response(
			array(
				'file_url' => $file_url,
			)
		);
	}

	/**
	 * Restfully check the ATP acceptance.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function restfully_check_atp_acceptance( WP_REST_Request $request ) {
		$auth = \PRC\Platform\User_Accounts\extract_user_auth_from_request( $request );
		if ( is_wp_error( $auth ) ) {
			return $auth;
		}
		if ( ! class_exists( 'PRC\Platform\User_Accounts\User_Data' ) ) {
			return new WP_Error( 'no_user_accounts', 'User Accounts class not found.', array( 'status' => 400 ) );
		}
		$user = new \PRC\Platform\User_Accounts\User_Data( $auth['uid'], $auth['token'] );
		return rest_ensure_response( $user->check_atp() );
	}

	/**
	 * Restfully accept the ATP.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function restfully_accept_atp( WP_REST_Request $request ) {
		$auth = \PRC\Platform\User_Accounts\extract_user_auth_from_request( $request );
		if ( is_wp_error( $auth ) ) {
			return $auth;
		}
		if ( ! class_exists( 'PRC\Platform\User_Accounts\User_Data' ) ) {
			return new WP_Error( 'no_user_accounts', 'User Accounts class not found.', array( 'status' => 400 ) );
		}
		$user = new \PRC\Platform\User_Accounts\User_Data( $auth['uid'], $auth['token'] );
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
	 * @return array{total: int, log: array, daily: array, new_data_uploaded: string|null, splits: array}
	 */
	public function restfully_get_download_log( $object ) {
		$post_id = (int) $object['id'];

		return self::get_download_stats( $post_id );
	}

	/**
	 * Restfully log a download for a dataset.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return array|WP_Error
	 */
	public function restfully_log_download( WP_REST_Request $request ) {
		$auth = \PRC\Platform\User_Accounts\extract_user_auth_from_request( $request );
		if ( is_wp_error( $auth ) ) {
			return $auth;
		}

		$id = $request->get_param( 'dataset_id' );
		if ( ! $id ) {
			return new WP_Error( 'no_dataset_id', 'No dataset ID provided.', array( 'status' => 400 ) );
		}

		$return = array();
		$return['total']   = $this->increment_download_total( $id );
		$return['monthly'] = $this->log_monthly_download_count( $id );
		$return['uid']     = $this->log_dataset_to_user( $auth['uid'], $id, $auth['token'] );

		return $return;
	}

	/**
	 * Get download stats for a dataset (total + yearly/monthly/daily log + optional splits).
	 *
	 * Results are cached in a transient for 24 hours.
	 *
	 * @param int $dataset_id Dataset post ID.
	 * @return array{total: int, log: array, daily: array, new_data_uploaded: string|null, splits: array}
	 */
	public static function get_download_stats( int $dataset_id ): array {
		$cache_key   = 'dataset_downloads_' . $dataset_id;
		$cached_data = get_transient( $cache_key );

		if ( false !== $cached_data && is_array( $cached_data ) && array_key_exists( 'daily', $cached_data ) ) {
			return $cached_data;
		}

		$to_return = array(
			'total'              => (int) get_post_meta( $dataset_id, '_total_downloads', true ),
			'log'                => array(),
			'daily'              => array(),
			'new_data_uploaded'  => null,
			'splits'             => array(),
		);

		$start_year   = 2020;
		$current_year = (int) gmdate( 'Y' );
		$years        = range( $start_year, $current_year );

		foreach ( $years as $year ) {
			$meta_key                  = '_downloads_' . $year;
			$month_data                = get_post_meta( $dataset_id, $meta_key, true );
			$to_return['log'][ $year ] = is_array( $month_data ) ? $month_data : array();

			$daily_key                   = Content_Type::get_daily_downloads_meta_key( $year );
			$daily_data                  = get_post_meta( $dataset_id, $daily_key, true );
			$to_return['daily'][ $year ] = is_array( $daily_data ) ? $daily_data : array();
		}

		$new_data_uploaded = get_post_meta( $dataset_id, Content_Type::$new_data_uploaded_meta_key, true );
		if ( is_string( $new_data_uploaded ) && '' !== $new_data_uploaded ) {
			$to_return['new_data_uploaded'] = $new_data_uploaded;
			$to_return['splits']            = self::compute_new_data_splits(
				$to_return['daily'],
				$new_data_uploaded
			);
		}

		set_transient( $cache_key, $to_return, DAY_IN_SECONDS );

		return $to_return;
	}

	/**
	 * Invalidate download-stats cache when new_data_uploaded meta changes.
	 *
	 * @param int    $meta_id    Meta ID.
	 * @param int    $object_id  Post ID.
	 * @param string $meta_key   Meta key.
	 * @param mixed  $meta_value Meta value.
	 */
	public function maybe_invalidate_stats_on_meta_change( $meta_id, $object_id, $meta_key, $meta_value ): void {
		if ( Content_Type::$new_data_uploaded_meta_key !== $meta_key ) {
			return;
		}
		if ( Content_Type::$post_object_name !== get_post_type( $object_id ) ) {
			return;
		}
		self::invalidate_download_stats_cache( $object_id );
	}

	/**
	 * Invalidate download-stats cache when new_data_uploaded meta is deleted.
	 *
	 * @param string[] $meta_ids   Meta IDs.
	 * @param int      $object_id  Post ID.
	 * @param string   $meta_key   Meta key.
	 * @param mixed    $meta_value Meta value.
	 */
	public function maybe_invalidate_stats_on_meta_delete( $meta_ids, $object_id, $meta_key, $meta_value ): void {
		$this->maybe_invalidate_stats_on_meta_change( 0, $object_id, $meta_key, $meta_value );
	}

	/**
	 * Compute before/after download splits for the month containing new_data_uploaded.
	 *
	 * @param array  $daily             Daily bucket map keyed by year => month => day => count.
	 * @param string $new_data_uploaded Site-local mysql datetime string.
	 * @return array<string, array{before: int, after: int, upload_day: string}>
	 */
	public static function compute_new_data_splits( array $daily, string $new_data_uploaded ): array {
		// Parse site-local mysql datetime as calendar components — do not run through
		// strtotime()/wp_date(), which reinterprets the naive string via PHP then site TZ.
		if ( ! preg_match( '/^(\d{4})-(\d{2})-(\d{2})/', $new_data_uploaded, $matches ) ) {
			return array();
		}

		$year       = $matches[1];
		$month      = $matches[2];
		$upload_day = $matches[3];
		$month_key  = $year . '-' . $month;

		$days = $daily[ (int) $year ][ $month ] ?? $daily[ $year ][ $month ] ?? null;
		if ( ! is_array( $days ) || empty( $days ) ) {
			return array();
		}

		$before = 0;
		$after  = 0;
		foreach ( $days as $day => $count ) {
			$day_padded = str_pad( (string) $day, 2, '0', STR_PAD_LEFT );
			$count      = (int) $count;
			if ( $day_padded < $upload_day ) {
				$before += $count;
			} else {
				$after += $count;
			}
		}

		return array(
			$month_key => array(
				'before'     => $before,
				'after'      => $after,
				'upload_day' => $upload_day,
			),
		);
	}

	/**
	 * Invalidate the download-stats transient for a dataset.
	 *
	 * @param int|string $dataset_id Dataset post ID.
	 */
	public static function invalidate_download_stats_cache( $dataset_id ): void {
		delete_transient( 'dataset_downloads_' . (int) $dataset_id );
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

		return self::get_download_stats( (int) $dataset_id );
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
			self::invalidate_download_stats_cache( $dataset_id );
			return true;
		} else {
			return new WP_Error( 'datasets/could-not-increment-total', 'Unable to increment download total.', array( 'status' => 500 ) );
		}
	}

	/**
	 * Log a download for a dataset (monthly + optional daily buckets).
	 *
	 * @param mixed $dataset_id The dataset ID.
	 * @return true|WP_Error
	 */
	public function log_monthly_download_count( $dataset_id ) {
		$year     = wp_date( 'Y' );
		$month    = wp_date( 'm' );
		$day      = wp_date( 'd' );
		$meta_key = '_downloads_' . $year;

		$data = get_post_meta( $dataset_id, $meta_key, true );

		if ( ! is_array( $data ) ) {
			$data = array();
		}

		if ( ! array_key_exists( $month, $data ) ) {
			$data[ $month ] = 0;
		}

		$data[ $month ] = (int) $data[ $month ] + 1;

		$updated = update_post_meta( $dataset_id, $meta_key, $data );

		if ( false === $updated ) {
			return new WP_Error( 'datasets/could-not-log-monthly', 'Unable to log monthly download data.', array( 'status' => 500 ) );
		}

		if ( Content_Type::is_day_logging_enabled() ) {
			$daily_key  = Content_Type::get_daily_downloads_meta_key( $year );
			$daily_data = get_post_meta( $dataset_id, $daily_key, true );
			if ( ! is_array( $daily_data ) ) {
				$daily_data = array();
			}
			if ( ! isset( $daily_data[ $month ] ) || ! is_array( $daily_data[ $month ] ) ) {
				$daily_data[ $month ] = array();
			}
			if ( ! array_key_exists( $day, $daily_data[ $month ] ) ) {
				$daily_data[ $month ][ $day ] = 0;
			}
			$daily_data[ $month ][ $day ] = (int) $daily_data[ $month ][ $day ] + 1;

			$daily_updated = update_post_meta( $dataset_id, $daily_key, $daily_data );
			if ( false === $daily_updated ) {
				return new WP_Error( 'datasets/could-not-log-daily', 'Unable to log daily download data.', array( 'status' => 500 ) );
			}
		}

		self::invalidate_download_stats_cache( $dataset_id );

		return true;
	}

	/**
	 * Log a dataset to a user.
	 *
	 * @param mixed       $uid        The user ID.
	 * @param mixed       $dataset_id The dataset ID.
	 * @param string|null $token      Firebase ID token for identity verification.
	 * @return true|WP_Error
	 */
	public function log_dataset_to_user( $uid, $dataset_id, $token = null ) {
		$user = new \PRC\Platform\User_Accounts\User_Data( $uid, $token );

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
