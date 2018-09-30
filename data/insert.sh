#!/bin/sh

PORT="8000"
DATABASE="mlu-starwars-content"

# set USER and PASS to your MarkLogic Admin username and password
USER="adminuser"
PASS="adminpassword"

#insert file to DB
SOURCE="./json"
for FILE in $(ls $SOURCE)
do
curl --ipv4 --digest --user $USER:$PASS -X PUT -T $SOURCE/$FILE -i "http://localhost:{$PORT}/v1/documents?uri=/character/{$FILE}&format=json&collection=character&database={$DATABASE}&perm:rest-reader=read"
echo "Processing $SOURCE/$FILE\n";

done

#insert images to DB
SOURCE="./image"
for FILE in $(ls $SOURCE)
do
curl --ipv4 --digest --user $USER:$PASS -X PUT -T $SOURCE/$FILE -i "http://localhost:{$PORT}/v1/documents?uri=/image/{$FILE}&collection=image&database={$DATABASE}&perm:rest-reader=read"
echo "Processing $SOURCE/$FILE\n";

done

#exit 1;
