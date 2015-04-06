Start =

  i: ->
    Start.handlers()

  handlers: ->

    $('.faq > .questions > .block > .question').on 'click', Start.answer


  answer: ->

    $('.faq > .questions > .block > .question').removeClass 'blue'
    $(this).addClass 'blue'
    _.off $('.faq > .questions > .block > .answer')
    _.on $(this).next()
