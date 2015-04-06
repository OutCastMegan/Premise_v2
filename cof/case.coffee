Case =
  
  cases: ['electrification','bloomberg','cpg','standard','ebola']
  current: false

  i: ->
    Case.handlers()

    if location.hash is ""
      Case.current = 1
    else
      Case.current = location.hash.replace '#', ''

    _.off '.loading'
    Case.load()

  handlers: ->

    console.log 'Case.handlers()'
    $('.cases > .case > .nav > .inner > .arrow').on 'click', Case.nav

  nav: ->
    t = $ this

    if t.hasClass 'right'
      if Case.current >= 5 then Case.current = 1 else Case.current++

    if t.hasClass 'left'
      if Case.current <= 1 then Case.current = 5 else Case.current--

    Case.load()


  load: ->
    _.off '.case'
    _.on ".case.case_#{Case.cases[Case.current-1]}"
    location.hash = Case.current
    window.scrollTo 0, 0
