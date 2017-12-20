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
const passport = require('passport');
var validator = require('validator');
var express = require('express'),
    mongoose = require('mongoose'),
    restful = require('node-restful'),
    multer = require('multer'),
    bcrypt = require('bcrypt-nodejs');

//own modules/routes
var restAPIchecks = require('./restapi/request-checks');
var errorResponseWare = require('./restapi/error-response');
var HttpError = require('./restapi/http-error');
var config = require('./config/main');

var auth = require('./routes/auth');
var users = require('./routes/users');
var pictures = require('./routes/pictures');
var places = require('./routes/places');
var component = require('./routes/components');
var upload = require('./routes/upload');



// app creation
var app = express();

//Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
var passportService = require('./config/passport');

// logging
app.use(morgan('dev'));

// API request checks for API-version and JSON etc.
app.use(restAPIchecks);

// Routes
mongoose.connect(config.database);


app.use('/upload', passport.authenticate('jwt', { session: false }), upload);
app.use('/places', passport.authenticate('jwt', { session: false }), places);
app.use('/users', users);
app.use('/auth', auth);

var PictureSchema = require('./models/picture'),
    ComponentSchema = require('./models/component');

var picture = restful.model('pictures', PictureSchema)
    .methods(['get', 'put', 'delete']);

var component = restful.model('components', ComponentSchema)
    .methods(['get', 'put', 'delete']);

picture.register(app, '/pictures');
component.register(app, '/components');

// (from express-generator boilerplate  standard code)
// Errorhandling and requests without proper URLs ************************
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log('Catching unmatched request to answer with 404');
    var err = new HttpError('Not Found', 404);
    next(err);
});

// register error handlers
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