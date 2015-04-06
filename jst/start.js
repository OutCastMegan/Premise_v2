var Start;

Start = {
  i: function() {
    return Start.handlers();
  },

  handlers: function() {
    $("#mapWrapper .mapMarker").click(Start.showMapSlide);
    $(".mapInfoWrapper .mapInfoClose").click(Start.closeMapSlide);
    $('#network #showMore').click(Start.showMore);
    return $('.faq > .questions > .block > .question').on('click', Start.answer);
  },

  answer: function() {
    $('.faq > .questions > .block > .question').removeClass('blue');
    $(this).addClass('blue');
    _.off($('.faq > .questions > .block > .answer'));
    return _.on($(this).next());
  },

  /* click functionality for the map slidy thingy */
  showMapSlide: function() {
    var index = $(this).index() - 1;
    $(".mapInfoWrapper.visible").removeClass("visible");
    /* disable scrolling with the panel is open */
    Start.disableScroll();
    /* slide the info card into view */
    $(".mapInfoWrapper").eq(index).addClass("visible");
  },

  /* click functionality for the close button */
  closeMapSlide: function() {
    Start.enableScroll();
    $(this).parent().removeClass("visible");
  },

  disableScroll: function() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
  },

  enableScroll: function() {
      if (window.removeEventListener) {
          window.removeEventListener('DOMMouseScroll', wheel, false);
      }
      window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
  },

  showMore: function() {
      $(".mapInfoWrapper.hidden").removeClass("hidden");
      $(this).hide();
  }
};

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [32, 37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}
