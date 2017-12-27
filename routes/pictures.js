/** This module defines the routes for pictures using mongoose for storing
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/pictures
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
var userModel = require('../models/picture'); //pin.js (Schema) saved as pinModel

var pictures = express.Router();

pictures.route('/')

    .all(function(req, res, next) {
        var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
        next(err);
    });

pictures.route('/:id')

/**
 * @api {get} /pictures/:id Get a picture
 * @apiName GetPicture
 * @apiVersion 0.1.0
 * @apiGroup Picture
 *
 * @apiParam {String} id       ID of the picture.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *       "_id": "123456",
 *       "updatedAt": "yyyy-MM-dd'T'HH:mm:ss'Z",
 *       "timestamp": "yyyy-MM-dd'T'HH:mm:ss'Z",
 *       "src": "www.s3.com",
 *       "owner": "987655",
 *       "place": "234567",
 *       "__v": 0,
 *       "is_visible": true
 * }
 *
 * */

/**
 * @api {put} /pictures/:id Modify a picture
 * @apiName PutPicture
 * @apiVersion 0.1.0
 * @apiGroup Picture
 *
 * @apiParam {String} _id                   ID of the picture.
 * @apiParam {String} [src]                 URL to the file.
 * @apiParam {String} [place]               ID of the place the picture is in.
 * @apiParam {String} [owner]               ID of the user who is owner.
 * @apiParam {Boolean} [is_visible=true]    Is the place visible.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *      "_id":"98765",
 *      "src":"quo1234",
 *      "place":"12345",
 *      "owner":"54321",
 *      "is_visible":true
 * }
 *
 * @apiSuccess {Object} picture  Modified picture Object.
 *
 * */

/**
 * @api {delete} /pictures/:id Delete a picture
 * @apiName DeletePicture
 * @apiVersion 0.1.0
 * @apiGroup Picture
 *
 * @apiParam {String} id       ID of the picture.
 *
 * */
    .all(function(req, res, next) {
        var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
        next(err);
    });

module.exports = pictures;