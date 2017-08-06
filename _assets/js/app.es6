function run() {

  // AnchorJS init
  anchors.options = {
    visible: 'touch',
    icon: '\uf02e' // http://fontawesome.io/icon/bookmark/
  }
  anchors.add(
    '.page__content > h1,' +
    '.page__content > h2,' +
    '.page__content > h3,' +
    '.page__content > h4,' +
    '.page__content > h5,' +
    '.page__content > h6'
  )

  // jQuery stuff
  $(() => {

    // FitVids init
    $('main').fitVids()

    // init sticky sidebar
    $(".sticky").Stickyfill()

    var stickySideBar = () => {
      var windowWidth = $(window).width()
      if (windowWidth > 1024) {
        // fix
        Stickyfill.rebuild()
        Stickyfill.init()
      } else {
        // unfix
        Stickyfill.stop()
      }
    }

    stickySideBar()

    $(window).resize(function(){
      stickySideBar()
    })

    // Follow menu drop down

    $(".author__urls-wrapper button").on("click", function() {
      $(".author__urls").fadeToggle("fast", function() {})
      $(".author__urls-wrapper button").toggleClass("open")
    })

    // init smooth scroll
    $("a").smoothScroll({
      offset: -20,
      beforeScroll: function(opts) {
        // add browser history (improves UX with _includes/toc)
        history.pushState({}, document.title, opts.link.href)
      },
      afterScroll: function(opts) {
        // trigger anchor :hover transition momentarily (assume outline:0)
        var anchor = opts.scrollTarget + ' > a.anchorjs-link'
        document.querySelector(anchor).focus()
        window.setTimeout(function() {
          document.querySelector(anchor).blur()
        }, 1000)
      }
    })

    // add lightbox class to all image links
    $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup")

    // Magnific-Popup options
    $(".image-popup").magnificPopup({
      disableOn: function() {
        if( $(window).width() < 500 ) {
          return false
        }
        return true
      },
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
      },
      removalDelay: 500, // Delay in milliseconds before popup is removed
      // Class that is added to body when popup is open.
      // make it unique to apply your CSS animations just to this exact popup
      mainClass: 'mfp-zoom-in',
      callbacks: {
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup
          this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim')
        }
      },
      closeOnContentClick: true,
      midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    })
  })
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
