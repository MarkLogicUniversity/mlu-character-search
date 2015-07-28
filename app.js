/**
 * This is the main application file, with the express configuration
 * (We are using Express 4)
 */
'use strict';
// process.env.NODE_ENV = 'development';

var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var router         = express.Router();
var routes         = require('./routes').app;
var apiroutes      = require('./routes').api;

app.set('port', 8080);
app.set('view engine', 'jade');
/**
 * these directory configurations are needed, with these we are
 * telling express to accept the content of these directories
 */
app.use('/components', express.static(__dirname + '/components'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(methodOverride());

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

/**
 * Route configuration
 */
router.route('/').get(routes.index);
router.route('/image/:uri').get(apiroutes.imagedata);
router.route('/api/characters').get(apiroutes.characters);
router.route('/api/search/characters/:term').get(apiroutes.search);
router.route('/api/search/characters/:key/:term').get(apiroutes.search);
router.route('/api/characters/:name').get(apiroutes.character);

//route declaration for the partials
router.route('/partials/:name').get(routes.partials);

//apply routes
app.use('/', router);

app.listen(app.get('port'));
console.log('Magic happens on port ' + app.get('port'));
