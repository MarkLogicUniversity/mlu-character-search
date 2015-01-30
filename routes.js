/**
 * Route.js handles the routes for our application
 *
 * The structure of this file is simple.
 *
 * First we get all the dependencies such as lodash and the marklogic node-client-api.
 *
 * Then we have functions that select all documents, select one document or execute a search.
 */
'use strict';

var marklogic  = require('marklogic');
var connection = require('./settings').connection;
var _          = require('lodash');
var db         = marklogic.createDatabaseClient(connection);
var qb         = marklogic.queryBuilder;
var fs         = require('fs');
var q = require('q');

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
              qb.term(term)
          )
      ).result();
  }
};

var add = function add(document) {
    var name = document.name.toLowerCase().replace(/[ -]/g, '');
    return db.documents.write({
        uri: '/character/' + name + '.json',
        contentType: 'application/json',
        content: document,
        collections: 'character'
    }).result();
};

var addImage = function addImage(image, callback) {
    var uri = image.originalname;
    return db.documents.write({
        uri: '/image/' + uri,
        contentType: 'image/png',
        collections: 'image',
        content: fs.readFileSync(image.path)
    }).result();
}

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
  selectAll()
  .then(function(data) {
    res.json(data);
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

var apiadd = function apiadd(req, res) {
    add(req.body).then(function(data) {
        res.json(200);
    });
};

var apiaddimage = function apiaddimage(req, res) {
    addImage(req.files.file).then(function(data) {
      console.log(data);
      //fs.unlinkSync(image.path);
        res.json(200);
    });
};

var apiimage = function(req, res) {
    var id = req.params.id;
    showImage(id).then(function(imageData) {
      res.json(new Buffer(imageData[0].content, 'binary').toString('base64'));
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
        add: apiadd,
        addimage: apiaddimage,
        imagedata: apiimage
    }
};
