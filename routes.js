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

var marklogic =require('./node-client-api/lib/marklogic.js'),
    connection = require('./settings').connection,
    _ = require('lodash'),
    db = marklogic.createDatabaseClient(connection),
    q = marklogic.queryBuilder;

var selectAll = function selectAll (callback) {
    db.documents.query(q.where(q.collection('character')).slice(1, 100)).result(function (documents) {
        callback(documents);
    });
};

var selectOne = function selectOne (uri, callback) {
    db.read('character/' + uri + '.json').result().then(function (document) {
        callback(document[0].content);
    });
};

var search = function search (key, term, callback) {
    if (key) {
        db.documents.query(
            q.where(
                q.word(key, term)
            )
        ).result(function (documents) {
            callback(documents);
        });
    } else {
        db.documents.query(
            q.where(
                q.term(term)
            )
        ).result(function (documents) {
            callback(documents);
        });
    }
};

var add = function add (document, callback) {
    var name = document.name.toLowerCase().replace(/[ -]/g, '');
    db.write({
        uri: 'character/' + name + '.json',
        contentType: 'application/json',
        content: document
    }).result(function (response) {
        callback(document);
    });
};

var showImage = function showImage (uri, callback) {
    var imageData = [];
    db.read('image/' + uri + '.png').result().then(function (data) {
        data.forEach(function (d) {
            imageData.push(new Buffer(d.content, 'binary').toString('base64'));
        });
        callback(imageData);
    });
}

/**
 * These functions render the appropriate jade templates
 * all application related routes have the 'app' prefix
 */

var appindex = function appindex(req, res) {
    res.render('index');
};

var appcharacters = function appcharacters(req, res) {
    res.render('characters');
};

var appsearch = function appcharacters(req, res) {
    res.render('search');
};

var appadd = function appadd(req, res) {
    res.render('add');
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
    var docs = [];
    var includeKeys = ['uri', 'content'];
    selectAll(function (documents) {
        documents.forEach(function (document) {
            document = _.pick(document, includeKeys);
            docs.push(document);
        });
        res.json(docs);
    });
};

var apicharacter = function apicharacter (req, res) {
    var uri = req.params.name;
    selectOne(uri, function (document) {
        res.json(document);
    });
    
};

var apisearch = function apisearch (req, res) {
    var key = req.params.key;
    var term = req.params.term;
    var results = [];
    var includeKeys = ['uri', 'content'];
    search(key, term, function (documents) {
        documents.forEach(function (document) {
            document = _.pick(document, includeKeys);
            results.push(document);
        });
        res.json(results);
    });
};

var apiadd = function apiadd (req, res) {
    add(req.body, function (data) {
        res.json(200);
    });
};

var apiimage = function(req, res) {
    var id = req.params.id;
    var doc = [];
    showImage(id, function (imageData) {
        res.json(imageData);
    });
};

/**
 * We export out both the app and api functions in order to access these in app.js
 */
module.exports = {
    app: {
        index: appindex,
        characters: appcharacters,
        search: appsearch,
        add: appadd,
        partials: partials
    },
    api: {
        characters: apicharacters,
        character: apicharacter,
        search: apisearch,
        add: apiadd,
        imagedata: apiimage
    }
};