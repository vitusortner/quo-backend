/** This module defines the routes for components using mongoose for storing
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/components
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
var userModel = require('../models/component'); //pin.js (Schema) saved as pinModel

var components = express.Router();

components.route('/')
    .all(function(req, res, next) {
        var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
        next(err);
    });

components.route('/:id')
/**
 * @api {get} /components/:id Get a component
 * @apiName GetComponent
 * @apiVersion 0.1.0
 * @apiGroup Component
 *
 * @apiParam {String} id       ID of the component.
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *{
        "_id": "12345",
        "updatedAt": "yyyy-MM-dd'T'HH:mm:ss'Z",
        "timestamp": "yyyy-MM-dd'T'HH:mm:ss'Z",
        "type": "Text",
        "position": 1,
        "__v": 0,
        "picture_key": "quo1Q2W3E4R",
        "text": "Example Text"
 },
 *
 * */

/**
 * @api {put} /components/:id Modify a component
 * @apiName PutComponent
 * @apiVersion 0.1.0
 * @apiGroup Component
 *
 * @apiParam {String}  _id                  ID of the component
 * @apiParam {Number} [position]            Position of the component.
 * @apiParam {String} [text=null]           Components can have text OR picture.
 * @apiParam {String} [picture_key=null]    Components can have text OR picture.
 *
 *
 * @apiParamExample {json} Request-Example:
 * {
 *           "_id":"876543",
 *           "position":"1",
 *           "text":"Example Text",
 *           "picture_key":"quo12345",
 * }
 *
 * @apiSuccess {Object} component  Component object that was created and added to the place.
 *
 * */

/**
 * @api {delete} /components/:id Delete a component
 * @apiName DeleteComponent
 * @apiVersion 0.1.0
 * @apiGroup Component
 *
 * @apiParam {String} id       ID of the component.
 *
 * */
    .all(function(req, res, next) {
        var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
        next(err);
    });



module.exports = components;