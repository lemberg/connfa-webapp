To deploy your project using ansistrano you need to have ansistrano installed on your machine.
Install deploy and rollback roles: `ansible-galaxy install ansistrano.deploy ansistrano.rollback`

* Copy `hosts.example` to `hosts` and place you hosts to deploy there
* Copy `settings.yml.example` to `settings.yml`, configure your host name and path to directory in destination host there 
* run `cd deploy/ && ansible-playbook -i hosts deploy.yml`
