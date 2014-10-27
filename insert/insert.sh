#!/bin/sh

#insert file to DB
SOURCE="/Users/tamaspiros/Desktop/mlu-sw/data/json"
for FILE in $(ls $SOURCE)
do
curl --ipv4 --digest --user admin:admin -X PUT -T $SOURCE/$FILE -i "http://localhost:5002/v1/documents?uri=/character/{$FILE}&format=json&collection=character"
echo "Processing $SOURCE/$FILE\n";

done

#insert images to DB
SOURCE="/Users/tamaspiros/Desktop/mlu-sw/data/image"
for FILE in $(ls $SOURCE)
do
curl --ipv4 --digest --user admin:admin -X PUT -T $SOURCE/$FILE -i "http://localhost:5002/v1/documents?uri=/image/{$FILE}&collection=image"
echo "Processing $SOURCE/$FILE\n";

done

exit 1;