/** This module defines the handlers for users
 *
 * @author Nora Koreuber
 *
 * @module controllers/users
 * @type {Controller}
 */

"use strict";

// modules
const codes = require('../restapi/http-codes'),
    HttpError = require('../restapi/http-error.js'),
    path = require('path'),
    AWS = require('aws-sdk'),
    multerS3 = require('multer-s3'),
    multer = require('multer'),
    bcrypt = require('bcrypt-nodejs');


// Set the region
AWS.config.update({region: 'eu-central-1'});
//get credentials from shared local file
const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
const s3 = new AWS.S3();

exports.create = function (req, res, next) {

    //to save local in /images
    /*var Storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./images");
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });

    var upload = multer({ storage: Storage }).single("imgUploader");*/

    let key;
    //to save in AWS S3
    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: 'quo-picture-bucket',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
                cb(null, Object.assign({}, req.body));
            },
            key: function (req, file, cb) {
                key= 'quo'+ bcrypt.hashSync(Date.now());
                cb(null, path.basename(key));
            }
        })
    }).single("imgUpload");

    upload(req, res, function (err) {
        if (err) {
            return next(err);
        }
        res.locals.processed = true;
        res.locals.items = {"key":key};
        res.status(codes.created);
        next();
    });
};

exports.readByKey = function (req, res, next) {
    const params = {
        Bucket: "quo-picture-bucket",
        Key: req.params.key
    };
    s3.getObject(params, function (err, data) {
        if (err) {
            next(err); // should be return next(err) ?
        }
        res.send({ data });
    });
};
