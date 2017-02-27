(function ($) {
  'use strict'

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

  var $ctx = $('.product-page');
  var $buyFormInput;
  var $mainImages;
  var $thumbnails;
  var $singleThumbnail;
  var $colorButton;
  var $dataId;
  var src;
  var $dataValue;

  if (($ctx).length) {
    $colorButton = $ctx.find('.control--radio');
    $thumbnails = $ctx.find('.product-thumbnails');
    $singleThumbnail = $ctx.find('.product-thumbnail');
    $mainImages = $ctx.find('.product-image-link');
    $buyFormInput = $ctx.find('.form--cart > input');

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
    $colorButton.on('click', function(e) {
      $dataId = $(this).data('id');
      $dataValue = $(this).data('value');
      $buyFormInput.attr('value', $dataValue);

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
