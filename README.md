# MarkLogic Character Search

The following steps assume that you already have a MarkLogic (v8) instance running. If you need help [installing MarkLogic](http://docs.marklogic.com/guide/installation/procedures#id_28962) please read this guide.

To get up and running with this repository please follow these steps:

1. `git clone https://github.com/marklogic/mlu-character-search.git`
2. `cd ml-rest` and check `config.json`. If you are happy with the details run the curl command from `curl.txt`
3. Time to insert the data into the database. Open your MarkLogic Query Console (http://localhost:8000) and import the `StarWars Data Load.xml` workspace. Run the code from the workspace against the database created in the previous step
4. In the root of the project folder execute `npm install`
5. In the root of the project folder execute `bower install`
6. Check `settings.js` and make sure the details are correct and reflect what you have specified in step 2
7. `node app.js`
