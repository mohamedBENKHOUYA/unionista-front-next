#!/bin/bash
docker compose --file /srv/front/current/docker-compose.yml down
# remove existing volumes
VOLUMES=$(docker volume ls | awk 'NR>1{print $2}' | awk 'BEGIN { ORS = " " } { print }');
docker volume rm $VOLUMES;
# create network if it doesn't exist
NETWORK_NAME=unionistashop_network
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then 
     docker network create --driver bridge ${NETWORK_NAME} ; 
fi
if [ -z $(docker ps --filter name=postgres --format="{{ .Names }}") ] ; then 
     docker compose --file /srv/back/current/docker-compose.yml down --remove-orphans
     docker compose --file /srv/front/current/docker-compose.yml up --build
else
     docker compose --file /srv/front/current/docker-compose.yml up
fi
