#! /bin/bash

docker compose down
docker compose up -d 
curl http://localhost:3001/