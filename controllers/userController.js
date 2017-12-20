/** This module defines the handlers for users
 *
 * @author Nora Koreuber
 *
 * @module controllers/users
 * @type {Controller}
 */

"use strict";

// modules
var express = require('express');
var codes = require('../restapi/http-codes');
var HttpError = require('../restapi/http-error.js');
var userModel = require('../models/user');

exports.findAll = function(req, res, next) {
    userModel.find({}, function (err, items) {
        res.locals.items = items;
        res.locals.processed = true;
        next();
    });
};

exports.postOne = function (req, res, next) {
    const user = new userModel(req.body);
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.locals.processed = true;
        res.locals.items = user;
        res.status(codes.created);
        next();
    });
};

exports.methodNotAllowed = function (req, res, next) {
    if (res.locals.processed) {
        next();
    } else {
        const err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
        next(err);
    }
};
