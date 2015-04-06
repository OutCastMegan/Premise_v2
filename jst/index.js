var Index;

Index = {
  cache: {},
  middle: 0,
  techdelay: 5000,
  interactionDelay: 20000,
  techInterval: false,
  techdot: 1,
  trigger: false,
  i: function() {
    Index.handlers();
    Index.dots();
    if (location.hash !== "") {
      Global.mobileoff();
      return $('html, body').animate({
        scrollTop: $("." + (location.hash.replace('#', ''))).offset().top - 60
      }, 500);
    }
  },
  handlers: function() {
    $(window).resize(function() {
      return Index.cache();
    });
    $('.tech > .typemenu > .dot').click(Index.tech);
    $('.cap > .capmenu > .item').click(Index.cap);
    return $('a[href*=#]:not([href=#])').click(function() {
      var target;
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 60
          }, 250);
          Global.mobileoff();
          return true;
        }
      }
    });
  },
  dots: function() {
    Index.cache();
    return Index.checking = setInterval(function() {
      return Index.check();
    }, 200);
  },
  techRotate: function(clicked) {
    var delay;
    if (clicked === true) {
      delay = Index.interactionDelay;
    } else {
      delay = Index.techdelay;
    }
    if (Index.techInterval !== false) {
      clearInterval(Index.techInterval);
    }
    return Index.techInterval = setInterval(function() {
      if (Index.techdot === 5) {
        Index.techdot = 1;
      } else {
        Index.techdot++;
      }
      Index.trigger = true;
      return $(".tech > .typemenu > .dot:nth-child(" + Index.techdot + ")").trigger('click');
    }, delay);
  },
  tech: function() {
    var t, type;
    t = $(this);
    type = t.data('type');
    $('.tech > .typemenu > .dot').removeClass('filled');
    t.addClass('filled');
    _.off('.tech > .types > .type');
    _.on(".tech > .types > .type.type_" + type);
    if (Index.trigger === true) {
      return Index.trigger = false;
    } else {
      return Index.techRotate(true);
    }
  },
  cache: function() {
    Index.middle = $(window).height() / 2;
    return $('.section').each(function(i, el) {
      return Index.cache[$(el).attr('name')] = {
        topmid: $(el).offset().top + ($(el).height() / 2)
      };
    });
  },
  check: function() {
    var diff, el, name, st, _ref;
    st = $(window).scrollTop() + Index.middle;
    $('.dots > .inner > .dot').removeClass('active');
    _ref = Index.cache;
    for (name in _ref) {
      el = _ref[name];
      diff = Math.abs(el.topmid - st);
      if (diff < Index.middle) {
        $('.dots > .inner > .dot').removeClass('active');
        $(".dots > .inner > .dot_" + name).addClass('active');
        return true;
      }
    }
  },
  cap: function() {
    var item, t;
    t = $(this);
    item = t.data('item');
    $('.cap > .capmenu > .item').removeClass('active');
    t.addClass('active');
    _.off('.cap > .caps > .capitem');
    return _.on(".cap > .caps > .capitem.cap_" + item);
  }
};
