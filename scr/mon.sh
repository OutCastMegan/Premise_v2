#!/bin/bash
node_modules/.bin/nodemon -e js,styl,jade -w tpl/ -w jst/ -w sty/ jst/render.js
