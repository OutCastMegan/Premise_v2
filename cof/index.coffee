Index =
  cache: {}
  middle: 0

  videoDelay: 1000
  techdelay: 5000
  interactionDelay: 20000
  techInterval: false
  techdot: 1
  trigger: false

  i: ->

    if Loader.mobile is false and Loader.iPad is false
      video = $("video.video#video#{Math.floor(Math.random() * 3) + 1}")
      name = video.data 'name'

      video.append(
        $('<source>',
          src: "./vid/#{name}.webm"
          type: "video/webm"
        )
      )

      video.append(
        $('<source>',
          src: "./vid/#{name}.mp4"
          type: "video/mp4"
        )
      )

      setTimeout ->
        _.on video
        _.off '.hero > .overlay'
        video[0].play()
      , Index.videoDelay

    Index.handlers()
    Index.dots()

    # Index.techRotate(false)

    # animate and go to any specified anchors in the URL
    if location.hash isnt ""
      Global.mobileoff()

      $('html, body').animate
          scrollTop: $(".#{location.hash.replace('#','')}").offset().top - 60
      , 500

  handlers: ->

    $(window).resize ->
      Index.cache()

    $('.tech > .typemenu > .dot').click Index.tech
    $('.cap > .capmenu > .item').click Index.cap

    $('a[href*=#]:not([href=#])').click ->
      if location.pathname.replace(/^\//, '') == @pathname.replace(/^\//, '') and location.hostname == @hostname
        target = $(@hash)
        target = if target.length then target else $('[name=' + @hash.slice(1) + ']')
        if target.length
          $('html,body').animate { scrollTop: target.offset().top - 60 }, 250
          Global.mobileoff()
          return true
      return

  # update our right dot menu based on active section
  dots: ->

    Index.cache()
    Index.checking = setInterval ->
      Index.check()
    , 200

  techRotate:  (clicked) ->

    if clicked is true then delay = Index.interactionDelay else delay = Index.techdelay

    if Index.techInterval isnt false then clearInterval Index.techInterval

    Index.techInterval = setInterval ->
      if Index.techdot is 5 then Index.techdot = 1 else Index.techdot++
      Index.trigger = true
      $(".tech > .typemenu > .dot:nth-child(#{Index.techdot})").trigger 'click'
    , delay


  tech: ->

    t = $ this

    type = t.data 'type'

    $('.tech > .typemenu > .dot').removeClass 'filled'
    t.addClass 'filled'

    _.off '.tech > .types > .type'
    _.on ".tech > .types > .type.type_#{type}"

    if Index.trigger is true then Index.trigger = false else Index.techRotate true

  cache: ->

    Index.middle = $(window).height() / 2

    $('.section').each (i, el) ->
      Index.cache[$(el).attr('name')] =
        topmid: $(el).offset().top + ( $(el).height() / 2 )

  check: ->

    st = $(window).scrollTop() + Index.middle

    $('.dots > .inner > .dot').removeClass 'active'
    for name, el of Index.cache
      diff = Math.abs( el.topmid - st)
      if diff < Index.middle
        $('.dots > .inner > .dot').removeClass 'active'
        $(".dots > .inner > .dot_#{name}").addClass 'active'
        return true

  cap: ->

    t = $ this
    item = t.data 'item'

    $('.cap > .capmenu > .item').removeClass 'active'
    t.addClass 'active'
    _.off '.cap > .caps > .capitem'
    _.on ".cap > .caps > .capitem.cap_#{item}"

