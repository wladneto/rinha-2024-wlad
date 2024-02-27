#!/bin/bash

docker compose down -v
cd api
docker build -t wladimirteixeiraneto/rinha-mongo:latest .
cd ..
docker compose up

#sleep 5
#cd ..
#./load-test/run-test.sh