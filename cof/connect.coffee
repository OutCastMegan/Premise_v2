Connect =

  arns:
    partnerships: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-partnerships'
    contributing: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-contributing'
    press: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-press'
    sales: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-sales'
    careers: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-careers'

  emailSubjects:
    partnerships: 'www.premise.com partnerships'
    contributing: 'www.premise.com contributing'
    press: 'www.premise.com press'
    sales: 'www.premise.com sales'
    careers: 'www.premise.com careers'

  i: ->
    Connect.handlers()

    AWS.config.update
      accessKeyId: 'AKIAJGUXCBOWUGUWQPJA'
      secretAccessKey: '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'
    AWS.config.region = 'us-east-1'
    
  handlers: ->

    $('form.form > .inner > .cta').click Connect.submit

  sns: (arn, emailSubject, message) ->

    sns = new AWS.SNS
      params:
        TopicArn: arn
        Subject: emailSubject

    sns.publish
      Message: message, (err, data) ->
        if !err
          Status.i true, 'Message sent successfully'
          Connect.reset()
        else
          Status.i false, "Error sending message: #{err}"

  verify: (data) ->

    if 'subject' not of data
      Status.i false, 'Please state what you want to chat about'
      return false

    if data.subject not of Connect.arns
      Status.i false, 'Invalid subject'
      return false

    if 'subscribe' not of data
      Status.i false, 'Please specify whether or not you want to subscribe'
      return false

    req =
      firstname: 'Please specify a first name'
      lastname: 'Please specify a last name'
      email: 'Please specify an E-mail address'
      role: 'Please specify a role'
      organization: 'Please specify an Organization'

    for key, value of req
      if data[key] is ""
        Status.i false, value
        return false
    return true

  reset: ->
    $('form.form')[0].reset()

  submit: ->

    form = $ 'form.form'
    data = {}

    $('form.form :input').each (i, el) ->
      input = $ el
      name = input.prop 'name'
      type = input.prop 'type'
      value = input.val()
      checked = input.is ':checked'

      if type in ['text','textarea','email']
        data[name] = value

      if type is 'radio' and checked
        data[name] = value

    return false if !Connect.verify data

    message = "
      First Name: #{data.firstname}\r\n
      Last Name: #{data.lastname}\r\n
      Email: #{data.email}\r\n
      Role: #{data.role}\r\n
      Organization: #{data.organization}\r\n
      Message: #{data.message}\r\n
      Subscribe: #{data.subscribe}\r\n
    "

    Connect.sns Connect.arns[data.subject], Connect.emailSubjects[data.subject], message

