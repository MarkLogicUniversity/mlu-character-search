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

var marklogic =require('marklogic'),
    connection = require('./settings').connection,
    _ = require('lodash'),
    db = marklogic.createDatabaseClient(connection),
    qb = marklogic.queryBuilder,
    fs = require('fs');

var selectAll = function selectAll (callback) {
    db.documents.query(qb.where(qb.collection('character')).slice(1, 100)).result(function (documents) {
        callback(documents);
    });
};

var selectOne = function selectOne (uri, callback) {
    db.documents.read('/character/' + uri + '.json').result().then(function (document) {
        callback(document[0].content);
    });
};

var search = function search (key, term, callback) {
    var docs = [];
    if (key) {
        db.documents.query(
            qb.where(
                qb.word(key, term)
            )
        ).result(function (documents) {
            documents.forEach(function (document) {
                docs.push(document.content);
            })
            callback(docs);
        });
    } else {
        db.documents.query(
            qb.where(
                qb.term(term)
            )
        ).result(function (documents) {
            documents.forEach(function (document) {
                docs.push(document.content);
            })
            callback(docs);
        });
    }
};

var add = function add (document, callback) {
    var name = document.name.toLowerCase().replace(/[ -]/g, '');
    db.write({
        uri: '/character/' + name + '.json',
        contentType: 'application/json',
        content: document,
        collections: 'character'
    }).result(function (response) {
        callback(document);
    });
};

var addImage = function addImage(image, callback) {
    var uri = image.originalname;
    db.write({
        uri: '/image/' + uri,
        contentType: 'image/png',
        collections: 'image',
        content: fs.readFileSync(image.path)
    }).result(function (response) {
        fs.unlinkSync(image.path);
    });
}

var showImage = function showImage (uri, callback) {
    var imageData = [];
    db.documents.read('/image/' + uri + '.png').result().then(function (data) {
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
    search(key, term, function (documents) {
        res.json(documents);
    });
};

var apiadd = function apiadd (req, res) {
    console.log('req body', req.body);
    add(req.body, function (data) {
        res.json(200);
    });
};

var apiaddimage = function apiaddimage (req, res) {
    addImage(req.files.file, function (data) {
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
        addimage: apiaddimage,
        imagedata: apiimage
    }
};
