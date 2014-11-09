#!/bin/bash
sudo npm install pm2 -g --unsafe-perm 2&>1 >/dev/null
cd /
cd /vagrant/nodeapp && sudo pm2 start server.js
sudo env PATH=$PATH:/usr/bin pm2 startup ubuntu -u vagrant