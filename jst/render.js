var cases, config, contribfaq, faq, file, fs, grid, jade, locals, section, sections, str, sty, stylus, _i, _len;

fs = require('fs');

jade = require('jade');

stylus = require('stylus');

config = require('../cfg/config.json');

grid = require('../cfg/grid.json');

contribfaq = require('../cfg/contribfaq.json');

faq = require('../cfg/faq.json');

cases = require('../cfg/cases.json');

locals = {
  pretty: true,
  c: config.cfg,
  grid: grid.grid,
  faq: faq,
  contribfaq: contribfaq,
  cases: cases
};

sty = function(style) {
  return style.set('paths', [__dirname + '/sty']);
};

str = fs.readFileSync('./sty/main.styl', 'utf8');

stylus(str).set('filename', './sty/main.styl').use(sty).render(function(error, css) {
  if (error) {
    console.log(error);
  }
  fs.writeFileSync('./css/main.css', css, 'utf8');
  return console.log('Successfully rendered ./css/main.css');
});

sections = ['index', 'about', 'work', 'start', 'careers', 'connect', 'press', 'faq', 'error', 'compatible', 'case'];

for (_i = 0, _len = sections.length; _i < _len; _i++) {
  section = sections[_i];
  if (section === 'index') {
    file = './index.html';
  } else {
    file = "./" + section + "/index.html";
  }
  fs.writeFile(file, jade.renderFile("tpl/" + section + ".jade", locals), function(error) {
    if (error) {
      return console.log(error);
    }
  });
  console.log("Successfully rendered " + file);
}
