(function ($) {
  'use strict'

  console.log('loaded');

  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.025;


  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elTransfromPos = (windowYOffset * speed);
      
      el.style.transform = "translate(0px, -" + elTransfromPos + "%)";

    });
  };

  // var parallax = document.querySelectorAll(".parallax"),
  //     speed = 0.025;


  // window.onscroll = function(){
  //   [].slice.call(parallax).forEach(function(el,i){

  //     var windowYOffset = window.pageYOffset,
  //         elBackgrounPos = "50% " + (windowYOffset * speed) + "%";
      
  //     el.style.backgroundPosition = elBackgrounPos;

  //   });
  // };

})(jQuery);
