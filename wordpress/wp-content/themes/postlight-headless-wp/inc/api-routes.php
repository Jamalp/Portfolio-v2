<?php
/**
 * Register custom REST API routes.
 */
add_action(
    'rest_api_init',
    function () {
        // Define API endpoint arguments
        $slug_arg = [
            'validate_callback' => function ( $param, $request, $key ) {
                return( is_string( $param ) );
            },
        ];
        $post_slug_arg = array_merge(
            $slug_arg,
            [
                'description' => 'String representing a valid WordPress post slug',
            ]
        );
        $page_slug_arg = array_merge(
            $slug_arg,
            [
                'description' => 'String representing a valid WordPress page slug',
            ]
        );

        // Register routes
        register_rest_route( 'portfolio/v1', '/post', [
            'methods'  => 'GET',
            'callback' => 'rest_get_post',
            'args' => [
                'slug' => array_merge(
                    $post_slug_arg,
                    [
                        'required' => true,
                    ]
                ),
            ],
        ] );

        register_rest_route( 'portfolio/v1', '/page', [
            'methods'  => 'GET',
            'callback' => 'rest_get_page',
            'args' => [
                'slug' => array_merge(
                    $page_slug_arg,
                    [
                        'required' => true,
                    ]
                ),
            ],
        ] );

        register_rest_route( 'portfolio/v1', '/projects', [
            'methods' => 'GET',
            'callback' => 'get_all_projects_callback',
            'args' => [
                'slug' => array_merge(
                    $page_slug_arg,
                    [
                        'required' => false,
                    ]
                ),
            ],
        ]);

        register_rest_route( 'portfolio/v1', '/project', [
            'methods'  => 'GET',
            'callback' => 'rest_get_project',
            'args' => [
                'slug' => array_merge(
                    $page_slug_arg,
                    [
                        'required' => true,
                    ]
                ),
            ],
        ] );

        register_rest_route('portfolio/v1', '/post/preview', [
            'methods'  => 'GET',
            'callback' => 'rest_get_post_preview',
            'args' => [
                'id' => [
                    'validate_callback' => function ( $param, $request, $key ) {
                        return ( is_numeric( $param ) );
                    },
                    'required' => true,
                    'description' => 'Valid WordPress post ID',
                ],
            ],
            'permission_callback' => function () {
                return current_user_can( 'edit_posts' );
            },
        ] );
    }
);

/**
 * Respond to a REST API request to get post data.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
function rest_get_post( WP_REST_Request $request ) {
    return rest_get_content( $request, 'post', __FUNCTION__ );
}

/**
 * Respond to a REST API request to get project data.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
function rest_get_project( WP_REST_Request $request ) {
    return rest_get_content( $request, 'project', __FUNCTION__ );
}

/**
 * Respond to a REST API request to get page data.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
function rest_get_page( WP_REST_Request $request ) {
    return rest_get_content( $request, 'page', __FUNCTION__ );
}

/**
 * Respond to a REST API request to get post or page data.
 * * Handles changed slugs
 * * Doesn't return posts whose status isn't published
 * * Redirects to the admin when an edit parameter is present
 *
 * @param WP_REST_Request $request Request
 * @param str             $type Type
 * @param str             $function_name Function name
 * @return WP_REST_Response
 */
function rest_get_content( WP_REST_Request $request, $type, $function_name ) {
    $content_in_array = in_array(
        $type,
        [
            'post',
            'page',
            'project',
        ],
        true
    );
    if ( ! $content_in_array ) {
        $type = 'post';
    }
    $slug = $request->get_param( 'slug' );
    $post = get_content_by_slug( $slug, $type );
    if ( ! $post ) {
        return new WP_Error(
            $function_name,
            $slug . ' ' . $type . ' does not exist',
            [
                'status' => 404,
            ]
        );
    };

    // Shortcut to WP admin page editor
    $edit = $request->get_param( 'edit' );
    if ( 'true' === $edit ) {
        header( 'Location: /wp-admin/post.php?post=' . $post->ID . '&action=edit' );
        exit;
    }
    $controller = new WP_REST_Posts_Controller( 'post' );
    $data = $controller->prepare_item_for_response( $post, $request );
    $response = $controller->prepare_response_for_collection( $data );

    return new WP_REST_Response( $response );
}

/**
 * Returns a post or page given a slug. Returns false if no post matches.
 *
 * @param str $slug Slug
 * @param str $type Valid values are 'post' or 'page'
 * @return Post
 */
function get_content_by_slug( $slug, $type = 'post' ) {
    $content_in_array = in_array(
        $type,
        [
            'post',
            'page',
            'project',
        ],
        true
    );
    if ( ! $content_in_array ) {
        $type = 'post';
    }
    $args = [
        'name'        => $slug,
        'post_type'   => $type,
        'post_status' => 'publish',
        'numberposts' => 1,
    ];

    // phpcs:ignore WordPress.VIP.RestrictedFunctions.get_posts_get_posts
    $post_search_results = get_posts( $args );

    if ( !$post_search_results ) { // Maybe the slug changed
        // check wp_postmeta table for old slug
        $args = [
            // phpcs:ignore WordPress.VIP.SlowDBQuery.slow_db_query_meta_query
            'meta_query' => [
                [
                    'key' => '_wp_old_slug',
                    'value' => $post_slug,
                    'compare' => '=',
                ],
            ],
        ];
        $query = new WP_Query( $args );
        $post_search_results = $query->posts;
    }
    if ( isset( $post_search_results[0] ) ) {
        return $post_search_results[0];
    }
    return false;
}

/**
 * Respond to a REST API request to get a post's latest revision.
 * * Requires a valid _wpnonce on the query string
 * * User must have 'edit_posts' rights
 * * Will return draft revisions of even published posts
 *
 * @param  WP_REST_Request $request Rest request.
 * @return WP_REST_Response
 */
function rest_get_post_preview( WP_REST_Request $request ) {

    $post_id = $request->get_param( 'id' );
    // Revisions are drafts so here we remove the default 'publish' status
    remove_action( 'pre_get_posts', 'set_default_status_to_publish' );
    $check_enabled = [
        'check_enabled' => false,
    ];
    if ( $revisions = wp_get_post_revisions( $post_id, $check_enabled ) ) {
        $last_revision = reset( $revisions );
        $rev_post = wp_get_post_revision( $last_revision->ID );
        $controller = new WP_REST_Posts_Controller( 'post' );
        $data = $controller->prepare_item_for_response( $rev_post, $request );
    } elseif ( $post = get_post( $post_id ) ) { // There are no revisions, just return the saved parent post
        $controller = new WP_REST_Posts_Controller( 'post' );
        $data = $controller->prepare_item_for_response( $post, $request );
    } else {
        $not_found = [
            'status' => 404,
        ];
        $error = new WP_Error(
            'rest_get_post_preview',
            'Post ' . $post_id . ' does not exist',
            $not_found
        );
        return $error;
    }
    $response = $controller->prepare_response_for_collection( $data );
    return new WP_REST_Response( $response );
}

function get_all_projects_callback( $request ) {
    // Initialize the array that will receive the posts' data. 
    $posts_data = array();
    // Receive and set the page parameter from the $request for pagination purposes
    $paged = $request->get_param( 'page' );
    $paged = ( isset( $paged ) || ! ( empty( $paged ) ) ) ? $paged : 1; 
    // Get the posts using the 'post' and 'news' post types
    $posts = get_posts( array(
            'paged' => $paged,
            'post__not_in' => get_option( 'sticky_posts' ),
            'posts_per_page' => 10,            
            'post_type' => array( 'project' ) // This is the line that allows to fetch multiple post types. 
        )
    ); 
    // Loop through the posts and push the desired data to the array we've initialized earlier in the form of an object
    foreach( $posts as $post ) {
        $id = $post->ID; 

        $controller = new WP_REST_Posts_Controller( 'post' );
        $data = $controller->prepare_item_for_response( $post, $request );
        $response = $controller->prepare_response_for_collection( $data );
        $new_data = new WP_REST_Response( $response ); 
        $posts_data[] = (object) array( 
            'id' => $id, 
            'slug' => $post->post_name, 
            'type' => $post->post_type,
            'title' => $post->post_title,
            'order' => $post->menu_order,
            'field_data' => $new_data
        );
    }                 

    
    return $posts_data;                   
} 