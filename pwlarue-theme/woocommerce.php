<?php

if (!class_exists('Timber')){
    echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
    return;
}

$context = Timber::get_context();
$context['sidebar'] = Timber::get_widgets('shop-sidebar');

if (is_singular('product')) {

    $context['post']    = Timber::get_post();
    $product            = wc_get_product( $context['post']->ID );
    $context['product'] = $product;

    $context['currency'] = get_woocommerce_currency();
    $context['product_price'] = $product->get_price();
    $context['currency_format'] = get_woocommerce_price_format();

    $product_cats = wp_get_post_terms( get_the_ID(), 'product_cat' );
    $context['product_categorys'] = $product_cats;

    // $variant_products = get_field( 'related_products' );
    // $context['related_products'] = $variant_products;

    $variant_products = get_field( 'color_variants' );
    $context['product_variant_collection'] = $variant_products;

    // Previous and next post for our product navigation.
    $prev_post = get_previous_post();
    $context['previous_product'] = $prev_post;

    $next_post = get_next_post();
    $context['next_product'] = $next_post;

    // $args = array(
    //    'numberposts' => -1,
    //    'post_type'   => 'products',
    //    'post_status' => 'publish',
    //    'order'       => 'ASC',
    //    'orderby'     => 'menu_order'
    // );
    // $context['all_products'] = Timber::get_posts( $args );

    Timber::render('single-product.twig', $context);

} else {

    $posts = Timber::get_posts();
    $context['products'] = $posts;

    $product_cats = get_terms( array(
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
    ) );

    $context['product_categorys'] = $product_cats;

    if ( is_product_category() ) {
        $queried_object = get_queried_object();
        $term_id = $queried_object->term_id;
        $context['category'] = get_term( $term_id, 'product_cat' );
        $context['title'] = single_term_title('', false);
    }

    Timber::render('product-archive.twig', $context);

}
