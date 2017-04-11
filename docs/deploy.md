# Deploy

[Ansistrano](https://github.com/ansistrano/deploy)

## Run

Deploy

`$ ansible-playbook -i deploy/hosts deploy/deploy.yml`

Rollback last

`$ ansible-playbook -i deploy/hosts deploy/rollback.yml`

## Setup

* `./deploy` - deploy config folder
* `./deploy/tasks` - before, after tasks
* rename `hosts.example` to `host` and change ssh connection data 
* rename `settings.yml.example` to `settings.yml` and change vars

## settings.yml

* `deploy.host` - host from `hosts` file that you want to deploy
* `deploy.path` - path on server where you want to deploy
