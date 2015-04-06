
fs = require 'fs'
jade = require 'jade'
stylus = require 'stylus'
config = require '../cfg/config.json'
grid = require '../cfg/grid.json'
contribfaq = require '../cfg/contribfaq.json'
faq = require '../cfg/faq.json'
cases = require '../cfg/cases.json'

locals =
  pretty: true
  c: config.cfg
  grid: grid.grid
  faq: faq
  contribfaq: contribfaq
  cases: cases

# define variables/etc from config you need in stylus
sty = (style) ->
  style.set 'paths', [__dirname + '/sty']

str = fs.readFileSync './sty/main.styl', 'utf8'
stylus(str).set('filename', './sty/main.styl').use(sty).render (error, css) ->
    console.log error if error
    fs.writeFileSync './css/main.css', css, 'utf8'
    console.log 'Successfully rendered ./css/main.css'

sections = ['index', 'about', 'work', 'start', 'careers', 'connect', 'press', 'faq', 'error', 'compatible', 'case']

for section in sections
  if section is 'index' then file = './index.html' else file = "./#{section}/index.html"

  fs.writeFile file, jade.renderFile("tpl/#{section}.jade", locals), (error) ->
    console.log error if error
  console.log "Successfully rendered #{file}"

