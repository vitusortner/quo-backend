/*
* Main App for QUO Server
*
* @author Nora Koreuber, Florian Schlueter
*
*/
"use strict";

var bodyParser = require('body-parser');
var debug = require('debug');
var morgan = require('morgan');
var validator = require('validator');
var express = require('express'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    restful = require('node-restful');

//own modules/routes
var restAPIchecks = require('./restapi/request-checks');
var errorResponseWare = require('./restapi/error-response');
var HttpError = require('./restapi/http-error');
var config = require('./config/main');

var user = require('./routes/users');
var picture = require('./routes/pictures');
var places = require('./routes/places');
var component = require('./routes/components');


// app creation
var app = express();

//Middleware
app.use(bodyParser.json());

// logging
app.use(morgan('dev'));

// API request checks for API-version and JSON etc.
app.use(restAPIchecks);

// Routes
mongoose.connect(config.database);

var UserSchema = require('./models/user'),
    PictureSchema = require('./models/picture'),
    ComponentSchema = require('./models/component'),
    PlaceSchema = require('./models/place');

var user = restful.model('users', UserSchema)
    .methods(['get', 'post', 'put', 'delete']);

var picture = restful.model('pictures', PictureSchema)
    .methods(['get', 'post', 'put', 'delete']);

var component = restful.model('components', ComponentSchema)
    .methods(['get', 'post', 'put', 'delete']);

var place = restful.model('places', PlaceSchema)
   .methods(['post', 'put', 'delete'])
    //to use with /places
    .route('get',function(req, res, next) {
        place.find({}, function (err, items) {
            res.locals.items = items; //all items from array are saved locally to be shown
            res.locals.processed = true; //being used for HttpError
            res.json(res.locals.items);
            delete res.locals.items;
        })
    })
    //to use with /places/:id/detail
    .route('detail', {
        detail: true,
        handler: function(req, res, next) {
        place.findOne({
                _id: req.params.id
            }, function(err, item) {
                res.json(item);
        })
    }});

user.register(app, '/users');
picture.register(app, '/pictures');
component.register(app, '/components');
place.register(app, '/places');

const router = require('./router');

// (from express-generator boilerplate  standard code)
// Errorhandling and requests without proper URLs ************************
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log('Catching unmatched request to answer with 404');
    var err = new HttpError('Not Found', 404);
    next(err);
});

// register error handlers
router(app);
errorResponseWare(app);

// Start server ****************************
app.listen(config.port, function (err) {
    if (err !== undefined) {
        console.log('Error on startup, ', err);
    }
    else {
        console.log('Listening on port 3000');
    }
});