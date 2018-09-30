@echo off

SET PORT=

REM set USER and PASS to your MarkLogic Admin username and password
SET USER=adminuser
SET PASS=adminpassword

REM create the MarkLogic app server and database
curl --digest --user %USER%:%PASS% -X POST -d@"config.json" -i -H "Content-type:application/json" http://localhost:%PORT%/v1/rest-apis

echo "Finished."

REM exit
