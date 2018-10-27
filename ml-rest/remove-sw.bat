@echo off

SET PORT=8002
SET APPSERVER=mlu-starwars

REM set USER and PASS to your MarkLogic Admin username and password
SET USER=adminuser
SET PASS=adminpassword

REM delete the MarkLogic app server and database
curl --digest --user %USER%:%PASS% -X DELETE -d@"config.json" -i -H "Content-type:application/json" "http://localhost:%PORT%/v1/rest-apis/%APPSERVER%?include=content&include=modules"

echo "Finished."

REM exit
