var Connect;

Connect = {
  arns: {
    partnerships: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-partnerships',
    contributing: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-contributing',
    press: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-press',
    sales: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-sales',
    careers: 'arn:aws:sns:us-east-1:021587868446:prod-www-contact-careers'
  },
  emailSubjects: {
    partnerships: 'www.premise.com partnerships',
    contributing: 'www.premise.com contributing',
    press: 'www.premise.com press',
    sales: 'www.premise.com sales',
    careers: 'www.premise.com careers'
  },
  i: function() {
    Connect.handlers();
    AWS.config.update({
      accessKeyId: 'AKIAJGUXCBOWUGUWQPJA',
      secretAccessKey: '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'
    });
    return AWS.config.region = 'us-east-1';
  },
  handlers: function() {
    return $(".connect > .address .cta").click(Connect.submit);
  },
  sns: function(arn, emailSubject, message) {
    var sns;
    sns = new AWS.SNS({
      params: {
        TopicArn: arn,
        Subject: emailSubject
      }
    });
    return sns.publish({
      Message: message
    }, function(err, data) {
      if (!err) {
        //Status.i(true, 'Message sent successfully');
        $("#submitButton").addClass("success").html("SENT!");
        return Connect.reset();
      } else {
        return Status.i(false, "Error sending message: " + err);
      }
    });
  },
  verify: function(data) {
    $(".connect .error").removeClass("error");
    var key, req, value;
    var valid = true;
    if (!('subject' in data)) {
      $("#formSubject").addClass("error");
      //Status.i(false, 'Please state what you want to chat about');
      valid = false;
    }
    if (!(data.subject in Connect.arns)) {
      //Status.i(false, 'Invalid subject');
      valid = false;
    }
    if (!('subscribe' in data)) {
      //Status.i(false, 'Please specify whether or not you want to subscribe');
      valid = false;
    }
    req = {
      firstname: 'Please specify a first name',
      lastname: 'Please specify a last name',
      email: 'Please specify an E-mail address',
      role: 'Please specify a role',
      organization: 'Please specify an Organization'
    };
    for (key in req) {
      value = req[key];
      if (data[key] === "") {
        $("#" + key).addClass("error");
        valid = false;
      } else {
        $("#" + key).addClass("success");
      }
    }

    if (valid) {
      return true;
    } else {
      return false;
    }
  },
  reset: function() {
    return $('form.form')[0].reset();
  },
  submit: function() {
    var data, form, message;
    form = $('form.form');
    data = {};
    $('.connect :input').each(function(i, el) {
      var checked, input, name, type, value;
      input = $(el);
      name = input.prop('name');
      type = input.prop('type');
      value = input.val();
      checked = input.is(':checked');
      if (type === 'text' || type === 'textarea' || type === 'email') {
        data[name] = value;
      }
      if (type === 'radio' && checked) {
        return data[name] = value;
      }
    });
    if (!Connect.verify(data)) {
      return false;
    }
    message = "First Name: " + data.firstname + "\r\n Last Name: " + data.lastname + "\r\n Email: " + data.email + "\r\n Role: " + data.role + "\r\n Organization: " + data.organization + "\r\n Message: " + data.message + "\r\n Subscribe: " + data.subscribe + "\r\n";
    return Connect.sns(Connect.arns[data.subject], Connect.emailSubjects[data.subject], message);
  }
};
