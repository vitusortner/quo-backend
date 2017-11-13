/*
* Main App for QUO Server
*
* @author Nora Koreuber, Florian Schlueter
*
*/
"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug');
var morgan = require('morgan');

//own modules/routes
var restAPIchecks = require('./restapi/request-checks');
var errorResponseWare = require('./restapi/error-response');
var HttpError = require('./restapi/http-error');

var user = require('./routes/users');
var picture = require('./routes/pictures');
var place = require('./routes/places');
var component = require('./routes/components');


// app creation
var app = express();

//Middleware

// logging
app.use(morgan('dev'));

// API request checks for API-version and JSON etc.
app.use(restAPIchecks);

// Routes
app.use('/users',user);
app.use('/places',place);
app.use('/pictures',picture);
app.use('/components',component);

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