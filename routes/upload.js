/** This module defines the routes to upload images to AWS S3 Instance
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/upload
 * @type {Router}
 * @description send data as form-data with key imgUpload and the file as value.
 */

// modules
var express = require('express'),
    codes = require('../restapi/http-codes'),
    HttpError = require('../restapi/http-error.js'),
    multer = require('multer'),
    multerS3 = require('multer-s3'),
    fs = require('fs'),
    AWS = require('aws-sdk'),
    path = require('path');

// Set the region
AWS.config.update({region: 'eu-central-1'});
//get creddentials from shared local file
var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
var s3 = new AWS.S3();

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: "quo-picture-bucket", Key: '', Body: ''};

var upload = express.Router();

upload.route('/')

    .post(function (req, res) {

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

        //to save in AWS S3
        var upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: 'quo-picture-bucket',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                metadata: function (req, file, cb) {
                    cb(null, Object.assign({}, req.body));
                },
                key: function (req, file, cb) {
                    cb(null, path.basename(file.originalname));
                }
            })
        }).single("imgUpload");

        upload(req, res, function (err) {
            if (err) {
                return res.end("Something went wrong! Error: "+ err);
            }
            return res.end("File uploaded sucessfully!.");
        });

    })

    .all(function (req, res, next) {
        var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
        next(err);
    });

upload.route('/:file')
    .get(function (req, res) {
        var params = {
            Bucket: "quo-picture-bucket",
            Key: file
        };

        var item = req.body;
        s3.getObject(params, function (err, data) {
            if (err) {
                return res.send({ "error": err });
            }
            res.send({ data });
        });

    });

upload.use(function (req, res, next) {
    if (res.locals.items) {
        res.json(res.locals.items);
        delete res.locals.items;
    } else if (res.locals.processed) {
        res.set('Content-Type', 'application/json');
        if (res.get('Status-Code') == undefined) { // maybe other code has set a better status code before
            res.status(204); // no content;
        }
        res.end();
    } else {
        next(); // will result in a 404 from app.js
    }
});


module.exports = upload;