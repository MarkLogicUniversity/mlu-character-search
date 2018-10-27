#!/bin/sh

PORT=8002
APPSERVER=mlu-starwars

# set USER and PASS to your MarkLogic Admin username and password
USER="adminuser"
PASS="adminpassword"

# delete the MarkLogic app server and database
curl --digest --user $USER:$PASS -X DELETE -d@"config.json" -i -H "Content-type:application/json" "http://localhost:{$PORT}/v1/rest-apis/{$APPSERVER}?include=content&include=modules"

echo "Finished."

# exit
