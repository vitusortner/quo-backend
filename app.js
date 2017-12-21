/*
* Main App for QUO Server
*
* @author Nora Koreuber, Florian Schlueter
*
*/
"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    debug = require('debug'),
    morgan = require('morgan'),
    validator = require('validator'),
    mongoose = require('mongoose'),
    restful = require('node-restful'),
    multer = require('multer');

//own modules/routes
const restAPIchecks = require('./restapi/request-checks'),
    errorResponseWare = require('./restapi/error-response'),
    HttpError = require('./restapi/http-error'),
    users = require('./routes/users'),
    places = require('./routes/places'),
    upload = require('./routes/upload'),
    controller = require('./controllers/controller');

// app creation
const app = express();

//Middleware
app.use(bodyParser.json());

// logging
app.use(morgan('dev'));

// API request checks for API-version and JSON etc.
app.use(restAPIchecks);

// Routes
mongoose.connect('mongodb://localhost:27017/quo');

app.use('/upload', upload);
app.use('/places', places);
app.use('/users', users);

const PictureSchema = require('./models/picture'),
    ComponentSchema = require('./models/component');

const picture = restful.model('pictures', PictureSchema)
    .methods(['get', 'put', 'delete']);

const component = restful.model('components', ComponentSchema)
    .methods(['get', 'put', 'delete']);

picture.register(app, '/pictures');
component.register(app, '/components');

app.use(controller.methodNotAllowed);
app.use(controller.sendToClient);

// (from express-generator boilerplate  standard code)
// Errorhandling and requests without proper URLs ************************
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log('Catching unmatched request to answer with 404');
    const err = new HttpError('Not Found', 404);
    next(err);
});

// register error handlers
errorResponseWare(app);

// Start server ****************************
app.listen(3000, function (err) {
    if (err !== undefined) {
        console.log('Error on startup, ', err);
    }
    else {
        console.log('Listening on port 3000');
    }
});