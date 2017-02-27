<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function add_to_context( $context ) {
		// $context['cart_contents'] = WC()->cart->get_cart_contents_count();
		$context['cart_url'] = wc_get_cart_url();
		$context['cart_content_count'] = WC()->cart->get_cart_contents_count();
		$context['cart_total'] = WC()->cart->get_cart_total();

		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		return $context;
	}

	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}

}

function timber_set_product( $post ) {
    global $product;
    if ( is_woocommerce() ) {
        $product = get_product($post->ID);
    }
}

new StarterSite();

// Remove pieces of the woocommerce templates using actions.
remove_action( 'woocommerce_single_product_summary',
 'woocommerce_template_single_rating', 10);
remove_action( 'woocommerce_single_product_summary',
 'woocommerce_template_single_title', 5);
remove_action( 'woocommerce_single_product_summary',
 'woocommerce_template_single_meta', 40);
remove_action( 'woocommerce_single_product_summary',
 'woocommerce_template_single_sharing', 50);
remove_action( 'woocommerce_after_single_product_summary',
 'woocommerce_output_product_data_tabs', 10);
remove_action( 'woocommerce_after_single_product_summary',
 'woocommerce_output_related_products', 20);
remove_action( 'woocommerce_before_shop_loop',
 'woocommerce_result_count', 20 );

add_filter( 'gettext', 'theme_sort_change', 20, 3 );

// Change the labels of the sorting dropdown for archive pages.
function theme_sort_change( $translated_text, $text, $domain ) {
	if ( is_woocommerce() ) {
		switch ( $translated_text ) {
		case 'Sort by price: low to high' :
		$translated_text = __( 'Price (low to high)', 'theme_text_domain' );
		break;
		case 'Sort by price: high to low' :
		$translated_text = __( 'Price (high to low)', 'theme_text_domain' );
		break;
		case 'Sort by newness' :
		$translated_text = __( 'New Products', 'theme_text_domain' );
		break;
		case 'Sort by popularity' :
		$translated_text = __( 'Popularity', 'theme_text_domain' );
		break;
		case 'Sort by title: Alphabetically' :
		$translated_text = __( 'Title (alphabetically)', 'theme_text_domain' );
		break;
		case 'Sort by title: Reverse-Alphabetically' :
		$translated_text = __( 'Title (reverse-alphabetically)', 'theme_text_domain' );
		break;
		case 'Default sorting' :
		$translated_text = __( 'Default', 'theme_text_domain' );
		break;
		}
	}
return $translated_text;
}


// Register custom scripts and pass the handle to wp_enqueue_scripts so
// they can be loaded by the theme.
function wpb_adding_scripts() {
	// Enqueue the script for the selectize library.
  wp_register_script('selectize', 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.4/js/standalone/selectize.min.js', null, null, true);                     
  wp_enqueue_script('selectize');
  // Enqueue the script for the main js file.
  wp_register_script('bundle', get_template_directory_uri() . '/assets/bundle.js', array('jquery'),'1.1', true);
  wp_enqueue_script('bundle');
}
add_action( 'wp_enqueue_scripts', 'wpb_adding_scripts' );


// Custom function for product category urls to use /shop/ instead of /product_category/
add_filter( 'rewrite_rules_array', function( $rules )
{
    $new_rules = array(
        'shop/([^/]*?)/page/([0-9]{1,})/?$' => 'index.php?product_cat=$matches[1]&paged=$matches[2]',
        'shop/([^/]*?)/?$' => 'index.php?product_cat=$matches[1]',
    );
    return $new_rules + $rules;
} );


// Adds WooCommerce Support
add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
    add_theme_support( 'woocommerce' );
}

add_filter('add_to_cart_fragments', 'woocommerce_header_add_to_cart_fragment');


if ( ! function_exists( 'storefront_cart_link' ) ) {
	/**
	 * Cart Link
	 * Displayed a link to the cart including the number of items present and the cart total
	 *
	 * @return void
	 * @since  1.0.0
	 */
	function storefront_cart_link() {
		?>
			<a class="cart-contents nav-link nav-link--last" href="<?php echo $woocommerce->cart->get_cart_url(); ?>" title="<?php _e('View your shopping cart', 'woothemes'); ?>">Cart
			  <span>
			  	<?php echo sprintf($woocommerce->cart->cart_contents_count);?>
			  </span>
			</a>
		<?php
	}
}

function woocommerce_header_add_to_cart_fragment( $fragments ) {

  global $woocommerce; 

  ob_start(); 

  ?>

  <a class="cart-contents nav-link nav-link--last" href="<?php echo $woocommerce->cart->get_cart_url(); ?>" title="<?php _e('View your shopping cart', 'woothemes'); ?>">Cart
  	<span>
  		<?php echo sprintf($woocommerce->cart->cart_contents_count);?>
  	</span>
 </a>

  <?php 

  $fragments['a.cart-contents'] = ob_get_clean();

  return $fragments; 
}

// Ensure cart contents update when products are added to the cart via AJAX (place the following in functions.php).
// Used in conjunction with https://gist.github.com/DanielSantoro/1d0dc206e242239624eb71b2636ab148


