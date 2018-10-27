@echo off

SET PORT=8000
SET DATABASE="mlu-starwars-content"

REM set USER and PASS to your MarkLogic Admin username and password
SET USER=adminuser
SET PASS=adminpassword

REM insert file to DB

SET SOURCE=json

for %%f in (./%SOURCE%/*.json) do (
  curl --ipv4 --digest --user %USER%:%PASS% -X PUT -T "%%~pf%SOURCE%/%%~nxf" -i "http://localhost:%PORT%/v1/documents?uri=/character/%%~nxf&format=json&collection=character&database=%DATABASE%&perm:rest-reader=read"
  echo "Processing %%~pf%SOURCE%/%%~nxf"
)

REM insert images to DB

SET SOURCE=image

for %%f in (./%SOURCE%/*.png) do (
  curl --ipv4 --digest --user %USER%:%PASS% -X PUT -T "%%~pf%SOURCE%/%%~nxf" -i "http://localhost:%PORT%/v1/documents?uri=/image/%%~nxf&collection=image&database=%DATABASE%&perm:rest-reader=read"
  echo "Processing %%~pf%SOURCE%/%%~nxf"
)

REM exit
