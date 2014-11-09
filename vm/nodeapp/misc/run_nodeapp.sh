#!/bin/bash
sudo npm install pm2 -g --unsafe-perm 2&>1 >/dev/null
cd /vagrant/nodeapp && sudo pm2 start server.js
