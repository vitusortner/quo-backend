/** This module defines the routes to upload images to AWS S3 Instance
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/upload
 * @type {Router}
 * @description send data as form-data with key imgUpload and the file as value.
 */

// modules
const express = require('express'),
    uploadController = require('../controllers/uploadController');

const upload = express.Router();

upload.route('/')
    .post(uploadController.create);

upload.route('/:key')
    .get(uploadController.readByKey);

module.exports = upload;