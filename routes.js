/**
 * Route.js handles the routes for our application
 *
 * The structure of this file is simple.
 *
 * First we get all the dependencies
 *
 * Then we have functions that select all documents, select one document or execute a search.
 */
'use strict';

var marklogic  = require('marklogic');
var connection = require('./settings').connection;
var db         = marklogic.createDatabaseClient(connection);
var qb         = marklogic.queryBuilder;

//getDocument('darthvader').then(getImage);
// getDocument('/character/darthvader.json')
// .then(getImage)
// .then(function(data) {
//   console.log(data);
// })

var getDocument = function(uri) {
  return db.documents.read(uri).result()
  .then(function(document) {
    return document[0].content;
  });
};

var getImage = function(uri, cb) {
  var data = [];
  var fbuf = [];
  db.documents.read('/image/' + uri).stream('chunked').
    on('data', function(chunk) {
      data.push(chunk);
      }).
    on('error', function(error) {
      console.log(JSON.stringify(error));
      }).
    on('end', function() {
      fbuf = Buffer.concat(data);
      cb(fbuf);
    });
};

var selectAll = function selectAll() {
  return db.documents.query(qb.where(qb.collection('character')).slice(1, 100)).result();
};

var selectOne = function selectOne(uri) {
  return db.documents.read('/character/' + uri + '.json').result()
};

var search = function search(key, term, callback) {
  if (key) {
    return db.documents.query(
        qb.where(
            qb.word(key, term)
        )
    ).result();
  } else {
      return db.documents.query(
          qb.where(
              qb.parsedFrom(term)
          )
      ).result();
  }
};

var showImage = function showImage(uri) {
    return db.documents.read('/image/' + uri + '.png').result();
}

/**
 * These functions render the appropriate jade templates
 * all application related routes have the 'app' prefix
 */

var appindex = function appindex(req, res) {
    res.render('index');
};

/**
 * Displaying partials (template files)
 * We need to use dynamic routing to render the right jade template files
 */
var partials = function partials(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

/**
 * These functions render JSON data
 * all api related routes have the 'api' prefix
 */
var apicharacters = function apiindex(req, res) {
  var results = [];
  var counter = 0;
  selectAll().then(function(documents) {
    documents.forEach(function(document) {
      getDocument(document.uri)
      .then(function(data) {
        counter++;
        results.push(data);
        if (counter === documents.length) {
          res.json(results);
        }
      });
    });
  });
};

var apicharacter = function apicharacter(req, res) {
    var uri = req.params.name;
    selectOne(uri).then(function(document) {
      res.json(document);
    });
};

var apisearch = function apisearch(req, res) {
    var key = req.params.key;
    var term = req.params.term;
    search(key, term).then(function(documents) {
        res.json(documents);
    });
};

var apiimage = function(req, res) {
  var uri = req.params.uri;
  res.writeHead(200, {'Content-Type': 'image/png'});
  getImage(uri, function(fbuf) {
    res.end(fbuf);
  });
};

/**
 * We export out both the app and api functions in order to access these in app.js
 */
module.exports = {
    app: {
        index: appindex,
        partials: partials
    },
    api: {
        characters: apicharacters,
        character: apicharacter,
        search: apisearch,
        imagedata: apiimage
    }
};
