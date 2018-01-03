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
    path = require('path'),
    AWS = require('aws-sdk'),
    multerS3 = require('multer-s3'),
    multer = require('multer'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('../config/main');

// Set the region
AWS.config.update({region: 'eu-central-1'});
//get credentials from shared local file
const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
const s3 = new AWS.S3();

exports.create = function (req, res, next) {
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
                key = ('quo' + bcrypt.hashSync(Date.now())).replace(/\//g, ".");
                cb(null, path.basename(key));
            }
        })
    }).single("imgUpload");

    upload(req, res, function (err) {
        if (err) {
            return next(err);
        }
        res.locals.processed = true;
        const path = config.pictureBucket + key;
        res.locals.items = {"path": path};
        res.status(codes.created);
        next();
    });
};

exports.readByKey = function (req, res, next) {

    /* const path = s3.getSignedUrl('getObject', {
              Bucket: "quo-picture-bucket",
              Key: req.params.key,
              Expires: 7760000 //90 days
          });*/

    const path = config.pictureBucket + req.params.key;

    res.locals.items = {"path": path};
    res.locals.processed = true;
    next();
};
