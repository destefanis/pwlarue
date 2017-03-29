(function ($) {
  'use strict'

  // Initialize Barba.js
  Barba.Pjax.start();

  Barba.Dispatcher.on('newPageReady', function() {
    $('select').selectize({
      sortField: 'text'
    });
  });

  // Parallax Code
  var parallax = document.querySelectorAll(".parallax"),
    speed = 0.025;

  if (($(window).width() > 1024)) {
    window.onscroll = function(){
      [].slice.call(parallax).forEach(function(el,i){

        var windowYOffset = window.pageYOffset,
          elTransfromPos = (windowYOffset * speed);
        
        el.style.transform = "translate(0px, -" + elTransfromPos + "%)";

      });
    };
  }

  // For product pages, lazy load the tiles with the lazy load specific class.
  if ($('#product-grid').length > 0) {
    $('.js-lazy').Lazy({
      scrollDirection: 'vertical',
      threshold: 800,
      onError: function(element) {
        console.log('error loading ' + element.data('src'));
      },
    });
  }
  
  // Use selectize.js for our select fields.
  $('select').selectize({
    sortField: 'text'
  });

  // Hide notice
  $('.content-wrapper').on('click', '.global-message-close', function() {
    $('.global-message').addClass('is-closing');
  });

  // Enable zoom on product images
  // $('.product-image-link').zoom();


  // Product variant and gallery fuctionality
  var $ctx = $('.product-page');
  var $buyFormInput;
  var $mainImages;
  var $thumbnails;
  var $singleThumbnail;
  var $colorButton;
  var $dataId;
  var src;
  var $dataValue;
  var $productName;
  var $dataName;
  var $productPrice;
  var $dataPrice;
  var $currencySymbol;

  if (($ctx).length) {
    $colorButton = $ctx.find('.control--radio');
    $thumbnails = $ctx.find('.product-thumbnails');
    $singleThumbnail = $ctx.find('.product-thumbnail');
    $mainImages = $ctx.find('.product-image-link');
    $buyFormInput = $ctx.find('.form--cart > input');
    $productName = $ctx.find('#product-name');
    $productPrice = $ctx.find('#product-price > .amount');
    $currencySymbol = $ctx.find('#product-price .woocommerce-Price-currencySymbol').html();

    $mainImages.click(function(e) {
      e.preventDefault();
    });

    // Swap main images when thumbnails are clicked.
    $singleThumbnail.click(function() {
      var $thumb = $(this);
      var src = $thumb.attr('src');
      var $dataId = $thumb.data('id');

      $('.product-image-link.is-active > .product-image').fadeOut(150, function() {
        var $this = $(this);
        $thumb.src = $this.src;
        $this.fadeIn(150)[0].src = src;
      })
    });

    // Swap images and color options when color variant is selected.
    // Also update product information with data attribute values.
    $colorButton.on('click', function(e) {
      $dataId = $(this).data('id');
      $dataValue = $(this).data('value');
      $buyFormInput.attr('value', $dataValue);
      $dataName = $(this).data('title');
      $dataPrice = $(this).data('price');

      // Swap Product Names
      $productName.text($dataName);

      // Swap Product Prices
      $productPrice.text($dataPrice);
      $productPrice.prepend($currencySymbol);

      $thumbnails.each(function() {
        var $this = $(this);

        if ($this.data('id') === $dataId) {
          $thumbnails.addClass('is-hidden');
          $this.removeClass('is-hidden');
        }
      });

      $mainImages.each(function() {
        var $this = $(this);

        if ($this.data('id') === $dataId) {
          $mainImages.addClass('is-hidden');
          $mainImages.removeClass('is-active');
          $this.removeClass('is-hidden');
          $this.addClass('is-active');
        }
      });
    });
  }

})(jQuery);

/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

  'use strict';

  // Helper vars and functions.
  function extend(a, b) {
    for(var key in b) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function createDOMEl(type, className, content) {
    var el = document.createElement(type);
    el.className = className || '';
    el.innerHTML = content || '';
    return el;
  }

  /**
   * RevealFx obj.
   */
  function RevealFx(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  /**
   * RevealFx options.
   */
  RevealFx.prototype.options = {
    // If true, then the content will be hidden until it´s "revealed".
    isContentHidden: true,
    // The animation/reveal settings. This can be set initially or passed when calling the reveal method.
    revealSettings: {
      // Animation direction: left right (lr) || right left (rl) || top bottom (tb) || bottom top (bt).
      direction: 'lr',
      // Revealer´s background color.
      bgcolor: '#f0f0f0',
      // Animation speed. This is the speed to "cover" and also "uncover" the element (seperately, not the total time).
      duration: 500,
      // Animation easing. This is the easing to "cover" and also "uncover" the element.
      easing: 'easeInOutQuint',
      // percentage-based value representing how much of the area should be left covered.
      coverArea: 0,
      // Callback for when the revealer is covering the element (halfway through of the whole animation).
      onCover: function(contentEl, revealerEl) { return false; },
      // Callback for when the animation starts (animation start).
      onStart: function(contentEl, revealerEl) { return false; },
      // Callback for when the revealer has completed uncovering (animation end).
      onComplete: function(contentEl, revealerEl) { return false; }
    }
  };

  /**
   * Init.
   */
  RevealFx.prototype._init = function() {
    this._layout();
  };

  /**
   * Build the necessary structure.
   */
  RevealFx.prototype._layout = function() {
    var position = getComputedStyle(this.el).position;
    if( position !== 'fixed' && position !== 'absolute' && position !== 'relative' ) {
      this.el.style.position = 'relative';
    }
    // Content element.
    this.content = createDOMEl('div', 'block-revealer__content', this.el.innerHTML);
    if( this.options.isContentHidden) {
      this.content.style.opacity = 0;
    }
    // Revealer element (the one that animates)
    this.revealer = createDOMEl('div', 'block-revealer__element');
    this.el.classList.add('block-revealer');
    this.el.innerHTML = '';
    this.el.appendChild(this.content);
    this.el.appendChild(this.revealer);
  };

  /**
   * Gets the revealer element´s transform and transform origin.
   */
  RevealFx.prototype._getTransformSettings = function(direction) {
    var val, origin, origin_2;

    switch (direction) {
      case 'lr' : 
        val = 'scale3d(0,1,1)';
        origin = '0 50%';
        origin_2 = '100% 50%';
        break;
      case 'rl' : 
        val = 'scale3d(0,1,1)';
        origin = '100% 50%';
        origin_2 = '0 50%';
        break;
      case 'tb' : 
        val = 'scale3d(1,0,1)';
        origin = '50% 0';
        origin_2 = '50% 100%';
        break;
      case 'bt' : 
        val = 'scale3d(1,0,1)';
        origin = '50% 100%';
        origin_2 = '50% 0';
        break;
      default : 
        val = 'scale3d(0,1,1)';
        origin = '0 50%';
        origin_2 = '100% 50%';
        break;
    };

    return {
      // transform value.
      val: val,
      // initial and halfway/final transform origin.
      origin: {initial: origin, halfway: origin_2},
    };
  };

  /**
   * Reveal animation. If revealSettings is passed, then it will overwrite the options.revealSettings.
   */
  RevealFx.prototype.reveal = function(revealSettings) {
    // Do nothing if currently animating.
    if( this.isAnimating ) {
      return false;
    }
    this.isAnimating = true;
    
    // Set the revealer element´s transform and transform origin.
    var defaults = { // In case revealSettings is incomplete, its properties deafault to:
        duration: 450,
        easing: 'easeInOutQuint',
        delay: 0,
        bgcolor: '#f0f0f0',
        direction: 'lr',
        coverArea: 0
      },
      revealSettings = revealSettings || this.options.revealSettings,
      direction = revealSettings.direction || defaults.direction,
      transformSettings = this._getTransformSettings(direction);

    this.revealer.style.WebkitTransform = this.revealer.style.transform =  transformSettings.val;
    this.revealer.style.WebkitTransformOrigin = this.revealer.style.transformOrigin =  transformSettings.origin.initial;
    
    // Set the Revealer´s background color.
    this.revealer.style.backgroundColor = revealSettings.bgcolor || defaults.bgcolor;
    
    // Show it. By default the revealer element has opacity = 0 (CSS).
    this.revealer.style.opacity = 1;

    // Animate it.
    var self = this,
      // Second animation step.
      animationSettings_2 = {
        complete: function() {
          self.isAnimating = false;
          if( typeof revealSettings.onComplete === 'function' ) {
            revealSettings.onComplete(self.content, self.revealer);
          }
        }
      },
      // First animation step.
      animationSettings = {
        delay: revealSettings.delay || defaults.delay,
        complete: function() {
          self.revealer.style.WebkitTransformOrigin = self.revealer.style.transformOrigin = transformSettings.origin.halfway;   
          if( typeof revealSettings.onCover === 'function' ) {
            revealSettings.onCover(self.content, self.revealer);
          }
          anime(animationSettings_2);   
        }
      };

    animationSettings.targets = animationSettings_2.targets = this.revealer;
    animationSettings.duration = animationSettings_2.duration = revealSettings.duration || defaults.duration;
    animationSettings.easing = animationSettings_2.easing = revealSettings.easing || defaults.easing;

    var coverArea = revealSettings.coverArea || defaults.coverArea;
    if( direction === 'lr' || direction === 'rl' ) {
      animationSettings.scaleX = [0,1];
      animationSettings_2.scaleX = [1,coverArea/100];
    }
    else {
      animationSettings.scaleY = [0,1];
      animationSettings_2.scaleY = [1,coverArea/100];
    }

    if( typeof revealSettings.onStart === 'function' ) {
      revealSettings.onStart(self.content, self.revealer);
    }
    anime(animationSettings);
  };
  
  window.RevealFx = RevealFx;

})(window);


(function() {
  setTimeout(init, 0);
  function init() {

    //************************ Example 1 - reveal on load ********************************
    if ($('#hero-image-1').length > 0) {
      var rev1 = new RevealFx(document.querySelector('#hero-image-1'), {
        revealSettings : {
          bgcolor: '#9599a5',
          onCover: function(contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
      rev1.reveal();
      var rev2 = new RevealFx(document.querySelector('#hero-image-2'), {
        revealSettings : {
          bgcolor: '#f4ebe4',
          delay: 250,
          onCover: function(contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
      rev2.reveal();
      var rev3 = new RevealFx(document.querySelector('#hero-title'), {
        revealSettings : {
          bgcolor: '#f7f7f7',
          delay: 500,
          direction: 'rl',
          onCover: function(contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
      rev3.reveal();
    }

    if ($('#hero-video-alt').length > 0) {
      var videoReveal = new RevealFx(document.querySelector('#hero-video-alt'), {
        revealSettings : {
          bgcolor: '#9599a5',
          onCover: function(contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
      videoReveal.reveal();
      var rev3 = new RevealFx(document.querySelector('#hero-title'), {
        revealSettings : {
          bgcolor: '#f7f7f7',
          delay: 500,
          direction: 'rl',
          onCover: function(contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
      rev3.reveal();
    }
  }
})();

