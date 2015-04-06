var Case;

Case = {
  cases: ['electrification', 'bloomberg', 'cpg', 'standard', 'ebola'],
  current: false,
  i: function() {
    Case.handlers();
    if (location.hash === "") {
      Case.current = 1;
    } else {
      Case.current = location.hash.replace('#', '');
    }
    _.off('.loading');
    return Case.load();
  },
  handlers: function() {
    setTimeout(Case.jumpToTop, 500);
    $(".grid .cell").click(Case.reloadPage);
    return $('.cases > .case > .nav > .inner > .arrow').on('click', Case.nav);
  },
  nav: function() {
    var t;
    t = $(this);
    if (t.hasClass('right')) {
      if (Case.current >= 5) {
        Case.current = 1;
      } else {
        Case.current++;
      }
    }
    if (t.hasClass('left')) {
      if (Case.current <= 1) {
        Case.current = 5;
      } else {
        Case.current--;
      }
    }
    return Case.load();
  },
  load: function() {
    _.off('.case');
    _.on(".case.case_" + Case.cases[Case.current - 1]);
    location.hash = Case.current;
    return window.scrollTo(0, 0);
  },
  reloadPage: function() {
    var hashtag = $(this).attr("href").split("#")[1];
    location.hash = "#" + hashtag;
    document.location.reload();
  },
  jumpToTop: function() {
    window.scrollTo(0, 0);
  }
};
