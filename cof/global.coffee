Global =
  mobiletouch: false

  i: ->

    Global.handlers()

  handlers: ->

    $('.hamburger').on 'click', Global.mobile
    $('.fade, .hfade').on 'click', Global.mobileoff
    $('.mobilemenu > .inner > .page > .item.aboutitem').on 'click', Global.mobilepage

    $('.footer > .inner > .right > .signup > form.signupform').submit Global.signup

    $('.more').click Global.more

  mobile: ->

    mm = $ '.mobilemenu'

    if mm.hasClass 'on'
      Global.mobileoff()
    else
      _.on mm, '.hamburger', '.hfade', '.fade'

      d = $(document)

      $('.fade').css(
        height: d.height()
        width: d.width()
      )

      $('body').addClass 'noscroll'

      d.bind 'touchmove', ->
        event.preventDefault()

  mobileoff: ->
    _.on '.page1'
    _.off '.page2'
    _.off '.mobilemenu', '.hamburger', '.hfade', '.fade'
    $('body').removeClass 'noscroll'
    $(document).unbind 'touchmove'

  mobilepage: ->

    if $('.page1').hasClass('on')
      _.off '.page1'
      _.on '.page2'
    else
      _.on '.page1'
      _.off '.page2'

  signup: ->

    email = $('form.signupform > input.email').val()

    if email is ''
      Status.i false, 'Please specify an e-mail address'
      return false

    AWS.config.update
      accessKeyId: 'AKIAJGUXCBOWUGUWQPJA'
      secretAccessKey: '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'
    AWS.config.region = 'us-east-1'
    
    sns = new AWS.SNS
      params:
        TopicArn: 'arn:aws:sns:us-east-1:021587868446:prod-www-newsletter-signup'
        Subject: 'www.premise.com newsletter signup'

    sns.publish
      Message: email, (err, data) ->
        if !err
          Status.i  true, 'Sign up successful!'
        else
          Status.i false, 'Error singing up'

    return false

  more: ->

    _.swap '.moreable'

    t = $ this

    if t.html() is '+ More'
      t.html('- Less')
    else
      t.html('+ More')

  signupreset: ->
    $('form.signupform')[0].reset()
