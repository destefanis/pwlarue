
(function() {
  // Fake loading.
  setTimeout(init, 1000);
  function init() {
    document.body.classList.remove('loading');
    console.log('loaded');
    //************************ Example 1 - reveal on load ********************************
    
    var rev1 = new RevealFx(document.querySelector('#hero-image-1'), {
      revealSettings : {
        bgcolor: '#7f40f1',
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
        }
      }
    });
    rev1.reveal();
    var rev2 = new RevealFx(document.querySelector('#hero-image-2'), {
      revealSettings : {
        bgcolor: '#fcf652',
        delay: 250,
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
        }
      }
    });
    rev2.reveal();
  }
})();
