#!/bin/sh

PORT=8002

# set USER and PASS to your MarkLogic Admin username and password
USER="adminuser"
PASS="adminpassword"

# create the MarkLogic app server and database
curl --digest --user $USER:$PASS -X POST -d@"config.json" -i -H "Content-type:application/json" http://localhost:$PORT/v1/rest-apis

echo "Finished."

# exit
