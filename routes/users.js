/** This module defines the routes for users using mongoose for storing
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/users
 * @type {Router}
 */

// remember: in modules you have 3 variables given by CommonJS
// 1.) require() function
// 2.) module.exports
// 3.) exports (which is module.exports)

// modules
var express = require('express');
var codes = require('../restapi/http-codes');
var HttpError = require('../restapi/http-error.js');

var mongoose = require('mongoose'); // object represents mongoose framework, possible to use all methods of mongoose
var userModel = require('../models/user'); //pin.js (Schema) saved as pinModel

var users = express.Router();

users.route('/')
    .all(function(req, res, next) {
        var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
        next(err);
    });

module.exports = users;
