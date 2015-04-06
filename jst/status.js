var Status;

Status = {
  el: false,
  timeout: false,
  close: false,
  i: function(type, message, timeout, close) {
    var copy, line, m, num, _i, _len, _ref;
    if (close !== void 0) {
      Status.close = close;
    }
    if (Status.el === false) {
      Status.el = $('.status');
      $(document).on('click', '.status > .close', Status.d);
    }
    if (type) {
      Status.el.addClass('success').removeClass('error');
    } else {
      Status.el.addClass('error').removeClass('success');
    }
    copy = Status.el.find('.copy > ul');
    copy.html('');
    if (Array.isArray(message)) {
      for (_i = 0, _len = message.length; _i < _len; _i++) {
        m = message[_i];
        if (typeof m === 'object' && 'error' in m) {
          if (m.file !== void 0) {
            copy.append("<li class=\"internal\"> <span class=\"status_type\">(" + m.type + ")</span> " + m.error + " <div class=\"status_file\">[" + m.file + ":" + m.line + "]</div></li>");
            _ref = m.code;
            for (num in _ref) {
              line = _ref[num];
              if (parseInt(m.line) === parseInt(num)) {
                copy.append("<li class=\"code active\"><div class=\"num\">" + num + "</div>" + line + "</li>");
              } else {
                copy.append("<li class=\"code\"><div class=\"num\">" + num + "</div>" + line + "</li>");
              }
            }
          } else {
            copy.append("<li>" + m.error + "</li>");
          }
        } else {
          copy.append("<li>" + m + "</li>");
        }
      }
    } else {
      copy.append("<li>" + message + "</li>");
    }
    _.on(Status.el);
    if (timeout && !isNaN(timeout)) {
      return Status.timeout = setTimeout(function() {
        return Status.d();
      }, timeout * 1000);
    }
  },
  d: function() {
    _.off(Status.el);
    if (Status.timeout) {
      clearTimeout(Status.timeout);
    }
    return typeof Status.close === "function" ? Status.close() : void 0;
  }
};
