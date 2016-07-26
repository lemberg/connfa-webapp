#!/usr/bin/env bash
scp -rp app src node_modules index.html systemjs.config.js connfa-web-app@uat.link:httpdocs
