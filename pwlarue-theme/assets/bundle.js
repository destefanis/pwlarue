!function(){"use strict";!function(t){var i=document.querySelectorAll(".parallax"),a=.025;t(window).width()>1024&&(window.onscroll=function(){[].slice.call(i).forEach(function(t,i){var e=window.pageYOffset,c=e*a;t.style.transform="translate(0px, -"+c+"%)"})}),t("select").selectize({sortField:"text"}),t(".content-wrapper").on("click",".global-message-close",function(){t(".global-message").addClass("is-closing")});var e,c,n,d,s,r,o,l,u,f,p,h,m=t(".product-page");m.length&&(s=m.find(".control--radio"),n=m.find(".product-thumbnails"),d=m.find(".product-thumbnail"),c=m.find(".product-image-link"),e=m.find(".form--cart > input"),l=m.find("#product-name"),f=m.find("#product-price > .amount"),h=m.find("#product-price .woocommerce-Price-currencySymbol").html(),c.click(function(t){t.preventDefault()}),d.click(function(){var i=t(this),a=i.attr("src");i.data("id");t(".product-image-link.is-active > .product-image").fadeOut(150,function(){var e=t(this);i.src=e.src,e.fadeIn(150)[0].src=a})}),s.on("click",function(i){r=t(this).data("id"),o=t(this).data("value"),e.attr("value",o),u=t(this).data("title"),p=t(this).data("price"),l.text(u),f.text(p),f.prepend(h),n.each(function(){var i=t(this);i.data("id")===r&&(n.addClass("is-hidden"),i.removeClass("is-hidden"))}),c.each(function(){var i=t(this);i.data("id")===r&&(c.addClass("is-hidden"),c.removeClass("is-active"),i.removeClass("is-hidden"),i.addClass("is-active"))})}))}(jQuery)}();