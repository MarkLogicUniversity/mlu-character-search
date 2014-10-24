/**
 * This is the main application file, with the express configuration
 * (We are using Express 4)
 */
'use strict';
process.env.NODE_ENV = 'development';

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    multer  = require('multer'),
    app = express(),
    router = express.Router(),
    routes = require('./routes').app,
    apiroutes = require('./routes').api;

app.set('port', 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
/**
 * these directory configurations are needed, with these we are
 * telling express to accept the content of these directories
 */
app.use('/components', express.static(__dirname + '/components'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/vendor', express.static(__dirname + '/vendor'));
// for file uploads
app.use(multer({ dest: './uploads/'}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(methodOverride());

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

/**
 * Route configuration
 * We are taking 
 */
router.route('/').get(routes.index);
router.route('/characters').get(routes.characters);
router.route('/characters/add').get(routes.add);
router.route('/search').get(routes.search);
router.route('/api/characters').get(apiroutes.characters);
router.route('/api/characters').post(apiroutes.add);
router.route('/api/characters/image').post(apiroutes.addimage);
router.route('/api/characters/search/:term').get(apiroutes.search);
router.route('/api/characters/search/:key/:term').get(apiroutes.search);
router.route('/api/characters/:name').get(apiroutes.character);
router.route('/api/characters/image/:id').get(apiroutes.imagedata)

//route declaration for the partials
router.route('/partials/:name').get(routes.partials);
app.use('/', router);

app.listen(app.get('port'));
console.log('Magic happens on port ' + app.get('port'));