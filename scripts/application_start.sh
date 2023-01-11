#!/bin/bash

cd /home/admin/eeekgamesbot/eeekgamesbot

npm install
pm2 start npm --name "eeekgamesbot"

node index.js > app.out.log 2> app.err.log < /dev/null &
