/*
* Main App for QUO Server
*
* @author Nora Koreuber, Florian Schlueter
*
*/
"use strict";

var express = require('express'),
    bodyParser = require('body-parser'),
    debug = require('debug'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    restful = require('node-restful');

//own modules/routes
var restAPIchecks = require('./restapi/request-checks');
var errorResponseWare = require('./restapi/error-response');
var HttpError = require('./restapi/http-error');

// app creation
var app = express();

//Middleware
app.use(bodyParser.json());

// logging
app.use(morgan('dev'));

// API request checks for API-version and JSON etc.
app.use(restAPIchecks);

// Routes
mongoose.connect('mongodb://localhost:27017/quo');

var UserSchema = require('./models/user'),
    PictureSchema =  require('./models/picture'),
    ComponentSchema = require('./models/component'),
    PlaceSchema = require('./models/place');

var user = restful.model('users',UserSchema)
    .methods(['get', 'post', 'put', 'delete']);

var picture = restful.model('pictures',PictureSchema)
    .methods(['get', 'post', 'put', 'delete']);

var component =  restful.model('components',ComponentSchema)
    .methods(['get', 'post', 'put', 'delete']);

var place =  restful.model('places',PlaceSchema)
    .methods(['get', 'post', 'put', 'delete']);

user.register(app, '/users');
picture.register(app, '/pictures');
component.register(app, '/components' );
place.register(app, '/places');


// (from express-generator boilerplate  standard code)
// Errorhandling and requests without proper URLs ************************
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log('Catching unmatched request to answer with 404');
    var err = new HttpError('Not Found', 404);
    next(err);
});

// register error handlers
errorResponseWare(app);

// Start server ****************************
app.listen(3000, function(err) {
    if (err !== undefined) {
        console.log('Error on startup, ',err);
    }
    else {
        console.log('Listening on port 3000');
    }
});