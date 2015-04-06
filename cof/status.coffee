
Status =

  el: false
  timeout: false
  close: false
  
  i: (type, message, timeout, close) ->

    Status.close = close if close isnt undefined

    if Status.el is false
      Status.el = $ '.status'
      $(document).on 'click', '.status > .close', Status.d

    if type
      Status.el
        .addClass 'success'
        .removeClass 'error'
    else
      Status.el
        .addClass 'error'
        .removeClass 'success'

    copy = Status.el.find '.copy > ul'
    copy.html ''

    if Array.isArray message
      for m in message
        if typeof m is 'object' and 'error' of m
          if m.file isnt undefined
            copy.append "<li class=\"internal\"> <span class=\"status_type\">(#{m.type})</span> #{m.error} <div class=\"status_file\">[#{m.file}:#{m.line}]</div></li>"
            for num, line of m.code
              if parseInt(m.line) is parseInt(num)
                copy.append "<li class=\"code active\"><div class=\"num\">#{num}</div>#{line}</li>"
              else
                copy.append "<li class=\"code\"><div class=\"num\">#{num}</div>#{line}</li>"
          else
            copy.append "<li>#{m.error}</li>"
        else
          copy.append "<li>#{m}</li>"
    else
      copy.append "<li>#{message}</li>"


    _.on Status.el

    if timeout and !isNaN timeout
      Status.timeout = setTimeout ->
        Status.d()
      , timeout*1000

  d: ->
    _.off Status.el
    clearTimeout Status.timeout if Status.timeout
    Status.close?()

