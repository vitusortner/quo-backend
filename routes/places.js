/** This module defines the routes for places using mongoose for storing
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/places
 * @type {Router}
 */

// modules
const express = require('express'),
    placeController= require('../controllers/placeController');

const places = express.Router();

places.route('/')
    .get(placeController.readAll)
    .post(placeController.createAndAddToHostedPlaces);

places.route('/:id')
    .get(placeController.readById)
    .put(placeController.update)
    .delete(placeController.delete);

places.route('/:id/components')
    .get(placeController.populateComponents)
    .post(placeController.createComponent);

places.route('/:id/pictures')
    .get(placeController.populatePictures)
    .post(placeController.createPicture);

places.route('/qrcode/:qr_code_id/:user_id')
    .get(placeController.readByQrCodeIdAndAddToVisitedPlaces);



module.exports = places;