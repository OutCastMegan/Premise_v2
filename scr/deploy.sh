#!/bin/bash
s3cmd \
  --exclude 'cof/*' \
  --exclude 'sty/*' \
  --exclude 'tpl/*' \
  --exclude '.git/*' \
  --exclude 'node_modules/*' \
  --exclude 'scr/*' \
  --exclude 'cfg/*' \
  --exclude '.DS_Store' \
  --exclude 'README.md' \
  --exclude '.gitignore' \
  sync . s3://premise-www-test

  ls -d -1 */* > invalidation-paths.txt
  echo 'index.html' >> invalidation-paths.txt
  echo '/' >> invalidation-paths.txt
  echo '/about/' >> invalidation-paths.txt
  echo '/careers/' >> invalidation-paths.txt
  echo '/case/' >> invalidation-paths.txt
  echo '/compatibility/' >> invalidation-paths.txt
  echo '/connect/' >> invalidation-paths.txt
  echo '/faq/' >> invalidation-paths.txt
  echo '/press/' >> invalidation-paths.txt
  echo '/start/' >> invalidation-paths.txt
  echo '/error/' >> invalidation-paths.txt
  echo '/work/' >> invalidation-paths.txt
