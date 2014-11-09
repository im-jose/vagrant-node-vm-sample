vagrant-node-vm-sample
======================

An example creating a Vagrant / Puphpet VM for NodeJS development

## Intro

I created this VM as an easy way to distribute an example for a REST API presentation
Presentation is also included in the folder with the same name.

## HTTP Presentation

This is a quick presentation on HTTP protocol and best practices for a REST API design.
It makes emphasis in HTTP Headers for requests and responses.  For more in-depth information please review the suggested links at the end of the presentation.

## NodeJS Application

The NodeJS application is a simple Express app that exposes 4 simple endpoints to create, read, update and delete a simple user object.

Endpoints:

- GET /api/users
- POST /api/users
- GET /api/users/:user_id
- PUT /api/users/:user_id
- DELETE /api/users/:user_id

Right now it connects to a simple sandbox Mongo DB in [Compose](https://www.compose.io/).  It is recommended that you create your own and change connection string in line 22.

## Vagrant & Puphpet

[Vagrant](https://www.vagrantup.com/) && [Puphpet](https://puphpet.com/) are the tools I used to create an Ubuntu VM with the following packages installed: curl, nodejs, npm, express, mongoose & body-parser.
Additionally, a small script is executed after provisioning (exec-once) installing pm2 package that will let us start the NodeJS app everytime the VM is started.

## Usage

Port 3001 in the host is being forwarded to port 8080 in the guest vm making 127.0.0.1:3001 available.

You can do on the host machine for example:

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3001/api/users

Or

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:8080/api/users
inside the VM (after doing vagrant ssh).
