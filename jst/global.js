var Global;

Global = {
  mobiletouch: false,
  storiesVisible: 8,
  i: function() {
    Global.checkScreenWidth();
    return Global.handlers();
  },
  handlers: function() {
    $('.hamburger').on('click', Global.mobile);
    $('.fade, .hfade').on('click', Global.mobileoff);
    $('.mobilemenu > .inner > .page > .item.aboutitem').on('click', Global.mobilepage);
    $('.footer .signup form.signupform').submit(Global.signup);
    $('.grid #showMore').on('click', Global.showMore);
    $(window).resize(Global.checkScreenWidth);
    return $('.more').click(Global.more);
  },
  mobile: function() {
    var d, mm;
    mm = $('.mobilemenu');
    if (mm.hasClass('on')) {
      return Global.mobileoff();
    } else {
      _.on(mm, '.hamburger', '.hfade', '.fade');
      d = $(document);
      /*$('.fade').css({
        height: d.height(),
        width: d.width()
      });
      $('body').addClass('noscroll');*/
      return d.bind('touchmove', function() {
        return event.preventDefault();
      });
    }
  },
  mobileoff: function() {
    _.on('.page1');
    _.off('.page2');
    _.off('.mobilemenu', '.hamburger', '.hfade', '.fade');
    //$('body').removeClass('noscroll');
    return $(document).unbind('touchmove');
  },
  mobilepage: function() {
    if ($('.page1').hasClass('on')) {
      _.off('.page1');
      return _.on('.page2');
    } else {
      _.on('.page1');
      return _.off('.page2');
    }
  },
  signup: function() {
    var email, sns;
    email = $('form.signupform > input.email').val();
    if (email === '') {
      //Status.i(false, 'Please specify an e-mail address');
      $('form.signupform').addClass("error");
      return false;
    }
    AWS.config.update({
      accessKeyId: 'AKIAJGUXCBOWUGUWQPJA',
      secretAccessKey: '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'
    });
    AWS.config.region = 'us-east-1';
    sns = new AWS.SNS({
      params: {
        TopicArn: 'arn:aws:sns:us-east-1:021587868446:prod-www-newsletter-signup',
        Subject: 'www.premise.com newsletter signup'
      }
    });
    sns.publish({
      Message: email
    }, function(err, data) {
      if (!err) {
        $('form.signupform').removeClass("error");
        $('form.signupform > input.submit').attr("value", "Sent!");
        //return Status.i(true, 'Sign up successful!');
        return;
      } else {
        return Status.i(false, 'Error singing up');
      }
    });
    return false;
  },
  more: function() {
    var t;
    _.swap('.moreable');
    t = $(this);
    if (t.html() === '+ More') {
      return t.html('- Less');
    } else {
      return t.html('+ More');
    }
  },
  signupreset: function() {
    return $('form.signupform')[0].reset();
  },
  showMore: function() {
    $(".grid .hiddenCell").removeClass("hiddenCell");
    $(".grid #showMore").hide();
  },
  checkScreenWidth: function() {
    /* if we're wider than 768 and there aren't already 8 stories visible */
    if(Global.storiesVisible != 8 && !Global.isMobile()) {
      Global.storiesVisible = 8;
      Global.updateGrid();
    } 
    
    /* if we're narrower than 768 and there aren't already 2 stories visible */
    else if (Global.storiesVisible != 2 && Global.isMobile()){
      Global.storiesVisible = 2;
      Global.updateGrid();
    }

  },
  updateGrid: function() {
    var stories = $(".grid .cell");
    /* reset all of the stories' visibility */
    stories.removeClass("hiddenCell");
    /* hide the stories after the storiesVisible threshold */
    for (var i = Global.storiesVisible; i < stories.length; i++) {
      stories.eq(i).addClass("hiddenCell");
    }
    $(".grid #showMore").show();
  },
  isMobile: function(){
    var width = $(window).width()
    return ($(window).width() <= 768);
  },
};
