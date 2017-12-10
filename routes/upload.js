/** This module defines the routes to upload images to AWS S3 Instance
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/upload
 * @type {Router}
 */


// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set the region
AWS.config.update({region: 'eu-central-1'});

//get creddentials from shared local file
var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: "quo-picutre-bucket", Key: '', Body: ''};


// modules
var express = require('express');
var codes = require('../restapi/http-codes');
var HttpError = require('../restapi/http-error.js');

var mongoose = require('mongoose'); // object represents mongoose framework, possible to use all methods of mongoose
var userModel = require('../models/picture'); //pin.js (Schema) saved as pinModel

var upload = express.Router();

upload.route('/')

    .get(function(req,res){
        res.end("Node-File-Upload");

    })

    .post(function(req, res) {
        // console.log(req.files.image.originalFilename);
        /*console.log(req.file);
        fs.readFile(req.files.image.path, function (err, data){
            var dirname = "/home/rajamalw/Node/file-upload";
            var newPath = dirname + "/uploads/" + 	req.files.image.originalFilename;
            fs.writeFile(newPath, data, function (err) {
                if(err){
                    res.json({'response':"Error"});
                }else {
                    res.json({'response':"Saved"});
                }
            });
        });*/

        if(req.files){
            console.log("files")
        }

       //TODO get file
        var file = req.file.path;

        var fs = require('fs');
        var fileStream = fs.createReadStream(file);
        fileStream.on('error', function(err) {
            console.log('File Error', err);
        });
        uploadParams.Body = fileStream;

        var path = require('path');
        uploadParams.Key = path.basename(file);

        // call S3 to retrieve upload file to specified bucket
        s3.upload (uploadParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            } if (data) {
                console.log("Upload Success", data.Location);
            }
        });
    })

    .all(function(req, res, next) {
    var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
    next(err);
});

upload.route('/:file')
    .get(function (req, res){
        file = req.params.file;
        var dirname = "/home/rajamalw/Node/file-upload";
        var img = fs.readFileSync(dirname + "/uploads/" + file);
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
    });

upload.use(function(req, res, next) {
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