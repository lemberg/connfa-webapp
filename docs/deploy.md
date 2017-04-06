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
* rename `hosts_example` to `host` and change ssh connection data 
