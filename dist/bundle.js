!function(){"use strict";!function(e){Barba.Pjax.start(),Barba.Dispatcher.on("newPageReady",function(){e("select").selectize({sortField:"text"})});var t=document.querySelectorAll(".parallax"),i=.025;e(window).width()>1024&&(window.onscroll=function(){[].slice.call(t).forEach(function(e,t){var n=window.pageYOffset,r=n*i;e.style.transform="translate(0px, -"+r+"%)"})}),e("#product-grid").length>0&&e(".js-lazy").Lazy({scrollDirection:"vertical",threshold:800,onError:function(e){console.log("error loading "+e.data("src"))}}),e("select").selectize({sortField:"text"}),e(".content-wrapper").on("click",".global-message-close",function(){e(".global-message").addClass("is-closing")});var n,r,o,a,l,s,c,d,u,f,v,h,p=e(".product-page");p.length&&(l=p.find(".control--radio"),o=p.find(".product-thumbnails"),a=p.find(".product-thumbnail"),r=p.find(".product-image-link"),n=p.find(".form--cart > input"),d=p.find("#product-name"),f=p.find("#product-price > .amount"),h=p.find("#product-price .woocommerce-Price-currencySymbol").html(),r.click(function(e){e.preventDefault()}),a.click(function(){var t=e(this),i=t.attr("src");t.data("id");e(".product-image-link.is-active > .product-image").fadeOut(150,function(){var n=e(this);t.src=n.src,n.fadeIn(150)[0].src=i})}),l.on("click",function(t){s=e(this).data("id"),c=e(this).data("value"),n.attr("value",c),u=e(this).data("title"),v=e(this).data("price"),d.text(u),f.text(v),f.prepend(h),o.each(function(){var t=e(this);t.data("id")===s&&(o.addClass("is-hidden"),t.removeClass("is-hidden"))}),r.each(function(){var t=e(this);t.data("id")===s&&(r.addClass("is-hidden"),r.removeClass("is-active"),t.removeClass("is-hidden"),t.addClass("is-active"))})}))}(jQuery),function(e){function t(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e}function i(e,t,i){var n=document.createElement(e);return n.className=t||"",n.innerHTML=i||"",n}function n(e,i){this.el=e,this.options=t({},this.options),t(this.options,i),this._init()}n.prototype.options={isContentHidden:!0,revealSettings:{direction:"lr",bgcolor:"#f0f0f0",duration:500,easing:"easeInOutQuint",coverArea:0,onCover:function(e,t){return!1},onStart:function(e,t){return!1},onComplete:function(e,t){return!1}}},n.prototype._init=function(){this._layout()},n.prototype._layout=function(){var e=getComputedStyle(this.el).position;"fixed"!==e&&"absolute"!==e&&"relative"!==e&&(this.el.style.position="relative"),this.content=i("div","block-revealer__content",this.el.innerHTML),this.options.isContentHidden&&(this.content.style.opacity=0),this.revealer=i("div","block-revealer__element"),this.el.classList.add("block-revealer"),this.el.innerHTML="",this.el.appendChild(this.content),this.el.appendChild(this.revealer)},n.prototype._getTransformSettings=function(e){var t,i,n;switch(e){case"lr":t="scale3d(0,1,1)",i="0 50%",n="100% 50%";break;case"rl":t="scale3d(0,1,1)",i="100% 50%",n="0 50%";break;case"tb":t="scale3d(1,0,1)",i="50% 0",n="50% 100%";break;case"bt":t="scale3d(1,0,1)",i="50% 100%",n="50% 0";break;default:t="scale3d(0,1,1)",i="0 50%",n="100% 50%"}return{val:t,origin:{initial:i,halfway:n}}},n.prototype.reveal=function(e){if(this.isAnimating)return!1;this.isAnimating=!0;var t={duration:450,easing:"easeInOutQuint",delay:0,bgcolor:"#f0f0f0",direction:"lr",coverArea:0},e=e||this.options.revealSettings,i=e.direction||t.direction,n=this._getTransformSettings(i);this.revealer.style.WebkitTransform=this.revealer.style.transform=n.val,this.revealer.style.WebkitTransformOrigin=this.revealer.style.transformOrigin=n.origin.initial,this.revealer.style.backgroundColor=e.bgcolor||t.bgcolor,this.revealer.style.opacity=1;var r=this,o={complete:function(){r.isAnimating=!1,"function"==typeof e.onComplete&&e.onComplete(r.content,r.revealer)}},a={delay:e.delay||t.delay,complete:function(){r.revealer.style.WebkitTransformOrigin=r.revealer.style.transformOrigin=n.origin.halfway,"function"==typeof e.onCover&&e.onCover(r.content,r.revealer),anime(o)}};a.targets=o.targets=this.revealer,a.duration=o.duration=e.duration||t.duration,a.easing=o.easing=e.easing||t.easing;var l=e.coverArea||t.coverArea;"lr"===i||"rl"===i?(a.scaleX=[0,1],o.scaleX=[1,l/100]):(a.scaleY=[0,1],o.scaleY=[1,l/100]),"function"==typeof e.onStart&&e.onStart(r.content,r.revealer),anime(a)},e.RevealFx=n}(window),function(){function e(){if($("#hero-image-1").length>0){var e=new RevealFx(document.querySelector("#hero-image-1"),{revealSettings:{bgcolor:"#9599a5",onCover:function(e,t){e.style.opacity=1}}});e.reveal();var t=new RevealFx(document.querySelector("#hero-image-2"),{revealSettings:{bgcolor:"#f4ebe4",delay:250,onCover:function(e,t){e.style.opacity=1}}});t.reveal();var i=new RevealFx(document.querySelector("#hero-title"),{revealSettings:{bgcolor:"#f7f7f7",delay:500,direction:"rl",onCover:function(e,t){e.style.opacity=1}}});i.reveal()}}setTimeout(e,0)}()}();