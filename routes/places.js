/** This module defines the routes for places using mongoose for storing
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/places
 * @type {Router}
 */

// modules
var express = require('express');
var codes = require('../restapi/http-codes');
var HttpError = require('../restapi/http-error.js');
var placeModel = require('../models/place');
var componentSchema = require('../models/component');
var pictureSchema = require('../models/picture');

var mongoose = require('mongoose');
var componentModel = mongoose.model('Component', componentSchema);
var pictureModel = mongoose.model('Picture', pictureSchema);

var places = express.Router();

places.route('/')

    /**
     * @api {get} /places Request all Place information's
     * @apiName GetPlaces
     * @apiGroup Place
     *
     * @apiSuccess {Object[]} places  List of all place Objects.
     *
     * */
    .get(function (req, res, next) {
        placeModel.find({}, function (err, items) {
            console.log("here");
            res.locals.items = items;
            res.locals.processed = true;
            next();
        });
    })

    /**
     * @api {post} /places Create a new Place
     * @apiName PostPlace
     * @apiGroup Place
     *
     * @apiParam {String}   title           Required title of the Place.
     * @apiParam {String}   title_picture   ID of the title picture.
     * @apiParam {Date}     [start=Now]     Optional start date.
     * @apiParam {Date}     [end]           Optional end date.
     * @apiParam {Number}   lat             Required latitude value.
     * @apiParam {Number}   long            Required longitude value.
     * @apiParam {Object}   [address]       Optional address object.
     * @apiParam {String}   [address.street]    Optional address Street.
     * @apiParam {String}   [address.city]      Optional address city.
     * @apiParam {Number}   [address.zip_code]  Optional address zip code.
     * @apiParam {String}   host            ID of the user who is host.
     * @apiParam {String}   qr_code_id      ID that is saved in QR Code.
     * @apiParam {String}   [qr_code]       Source String of the QR Code Image.
     * @apiParam {Object[]} [components]    ID's from Components the place contains
     * @apiParam {Object[]} [pictures]      ID's from pictures the place contains
     * @apiParam {Object}   [settings]      Optional settings object
     * @apiParam {Boolean}  [settings.is_photo_upload_allowd=true]     Are users allowed to upload images to the place gallery.
     * @apiParam {Boolean}  [settings.has_to_validate_gps=true]        Are user required to be at the geological location of the place.
     *
     * @apiParamExample {json} Request-Example:
     *{
     *           "title":"Example Place",
     *           "title_picture":"quo1A2B3C",
     *           "start":"yyyy-MM-dd'T'HH:mm:ss'Z",
     *           "end":"yyyy-MM-dd'T'HH:mm:ss'Z",
     *           "lat":1234,
     *           "long":4321,
     *           "address":{
     *               "street":"Example Street 42",
     *               "city":"Examplecity",
     *               "zip-code":"12345"
     *           },
     *           "host":"12345",
     *           "qr_code_id":"9A8B7C6D5F",
     *           "qr_code":"quo9Z8Y7X",
     *           "components":["1a2b3c4d5e6f7g8h9i10j11k"],
	 *           "pictures":["1a2b3c4d5e6f7g8h9i10j11k"],
     *           "settings":{
     *               "is_photo_upload_allowed":true,
     *               "has_to_validate_gps":true
     *           }
     *  }
     *
     * @apiSuccess {Object} place  Place object that was created.
     *
     * */
    .post(function (req, res, next) {

        var place = new placeModel(req.body);

        place.save(function (err) {
            if (err) {
                return next(err);
            }
            res.locals.processed = true;

            res.locals.items = place;
            res.status(codes.created);
            next();
        });

    })

    .all(function (req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

places.route('/:id')

    /**
     * @api {get} /places/:id Request place information's
     * @apiName GetPlace
     * @apiGroup Place
     *
     * @apiParam {String} id Unique Place-ID
     *
     * @apiSuccess {Object} place  Requested place Object.
     *
     * */
    .get(function (req, res, next) {
        placeModel.findById(req.params.id, function (err, items) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                res.locals.items = items; //return item is shown
                res.locals.processed = true;
                next();
            }
        });
    })


    /**
     * @api {put} /places/:id Modifiy a place
     * @apiName PutPlace
     * @apiGroup Place
     *
     * @apiParam {String}   id              Unique Place ID of the place you want to change
     * @apiParam {String}   title           Required title of the Place.
     * @apiParam {String}   title_picture   ID of the title picture.
     * @apiParam {Date}     [start=Now]     Optional start date.
     * @apiParam {Date}     [end]           Optional end date.
     * @apiParam {Number}   lat             Required latitude value.
     * @apiParam {Number}   long            Required longitude value.
     * @apiParam {Object}   [address]       Optional address object.
     * @apiParam {String}   [address.street]    Optional address Street.
     * @apiParam {String}   [address.city]      Optional address city.
     * @apiParam {Number}   [address.zip_code]  Optional address zip code.
     * @apiParam {String}   host            ID of the user who is host.
     * @apiParam {String}   qr_code_id      ID that is saved in QR Code.
     * @apiParam {String}   [qr_code]       Source String of the QR Code Image.
     * @apiParam {Object[]} [components]    ID's from Components the place contains
     * @apiParam {Object[]} [pictures]      ID's from pictures the place contains
     * @apiParam {Object}   [settings]      Optional settings object
     * @apiParam {Boolean}  [settings.is_photo_upload_allowd=true]     Are users allowed to upload images to the place gallery.
     * @apiParam {Boolean}  [settings.has_to_validate_gps=true]        Are user required to be at the geological location of the place.
     *
     * @apiParamExample {json} Request-Example:
     *{
     *           "title":"Other Place",
     *           "title_picture":"quo1A2B3C",
     *           "start":"yyyy-MM-dd'T'HH:mm:ss'Z",
     *           "end":"yyyy-MM-dd'T'HH:mm:ss'Z",
     *           "lat":4321,
     *           "long":1234,
     *           "address":{
     *               "street":"Other Street 42",
     *               "city":"Othercity",
     *               "zip-code":"54321"
     *           },
     *           "host":"54321",
     *           "qr_code_id":"9A8B7C6D5F",
     *           "qr_code":"quo9Z8Y7X",
     *           "components":["1a2b3c4d5e6f7g8h9i10j11k"],
	 *           "pictures":["1a2b3c4d5e6f7g8h9i10j11k"],
     *           "settings":{
     *               "is_photo_upload_allowed":true,
     *               "has_to_validate_gps":true
     *           }
     *  }
     *
     * @apiSuccess {Object} place  Place object that was changed.
     *
     * */
    .put(function (req, res, next) {

        if (req.params.id !== req.body._id) {
            var err = new HttpError('id of PUT resource and send JSON body are not equal: ' + req.params.id + " " + req.body.id, codes.wrongrequest);
            next(err);
            return;
        }

        placeModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true}, (err, item) => {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                res.locals.processed = true;
                res.locals.items = item;
                res.status(codes.success);
                next();
            }
        });
    })

    /**
     * @api {delete} /places/:id Delete place object
     * @apiName DeletePlace
     * @apiGroup Place
     *
     * @apiParam {String} id  Unique ID of the place you want to delete
     *
     * */
    .delete(function (req, res, next) {
        placeModel.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                res.status(codes.success);
                res.locals.processed = true;
                next();
            }
        });
    })

    .all(function (req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

places.route('/:id/components')


    /**
     * @api {get} /places/:id/components Request all component objects
     * @apiName GetPlaceComponents
     * @apiGroup Place
     *
     * @apiParam {String} id  Unique ID of the place
     *
     * @apiSuccess {Object[]} components  List of all components objects the place contains.
     *
     * */
    .get(function (req, res, next) {
        placeModel.findById(req.params.id).populate('components').exec(function (err, items) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                res.locals.items = items.components;
                res.locals.processed = true;
                next();
            }
        })
    })
    /**
     * @api {post} /places/:id/components Create a new Component
     * @apiName PostPlace
     * @apiGroup Place
     *
     * @apiParam {String}   title           Required title of the Place.
     * @apiParam {String}   title_picture   ID of the title picture.
     * @apiParam {Date}     [start=Now]     Optional start date.
     * @apiParam {Date}     [end]           Optional end date.
     * @apiParam {Number}   lat             Required latitude value.
     * @apiParam {Number}   long            Required longitude value.
     * @apiParam {Object}   [address]       Optional address object.
     * @apiParam {String}   [address.street]    Optional address Street.
     * @apiParam {String}   [address.city]      Optional address city.
     * @apiParam {Number}   [address.zip_code]  Optional address zip code.
     * @apiParam {String}   host            ID of the user who is host.
     * @apiParam {String}   qr_code_id      ID that is saved in QR Code.
     * @apiParam {String}   [qr_code]       Source String of the QR Code Image.
     * @apiParam {Object[]} [components]    ID's from Components the place contains
     * @apiParam {Object[]} [pictures]      ID's from pictures the place contains
     * @apiParam {Object}   [settings]      Optional settings object
     * @apiParam {Boolean}  [settings.is_photo_upload_allowd=true]     Are users allowed to upload images to the place gallery.
     * @apiParam {Boolean}  [settings.has_to_validate_gps=true]        Are user required to be at the geological location of the place.
     *
     * @apiParamExample {json} Request-Example:
     *{
     *           "title":"Example Place",
     *           "title_picture":"quo1A2B3C",
     *           "start":"yyyy-MM-dd'T'HH:mm:ss'Z",
     *           "end":"yyyy-MM-dd'T'HH:mm:ss'Z",
     *           "lat":1234,
     *           "long":4321,
     *           "address":{
     *               "street":"Example Street 42",
     *               "city":"Examplecity",
     *               "zip-code":"12345"
     *           },
     *           "host":"12345",
     *           "qr_code_id":"9A8B7C6D5F",
     *           "qr_code":"quo9Z8Y7X",
     *           "components":["1a2b3c4d5e6f7g8h9i10j11k"],
	 *           "pictures":["1a2b3c4d5e6f7g8h9i10j11k"],
     *           "settings":{
     *               "is_photo_upload_allowed":true,
     *               "has_to_validate_gps":true
     *           }
     *  }
     *
     * @apiSuccess {Object} place  Place object that was created.
     *
     * */
    .post(function (req, res, next) {
        var component = new componentModel(req.body);
        var component_id = component._id;
        var error = false;

        placeModel.findById(req.params.id, function (err, place) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                var components_array = place.components;
                components_array.push(component_id);
                placeModel.findByIdAndUpdate(req.params.id, {$set: {components: components_array}}, { runValidators: true , new: true}, function (err) {
                    if (err) {
                        error = true;
                        next(err);
                    }
                })
            }
        });

        if (!error) {
            component.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.locals.processed = true;

                res.locals.items = component;
                res.status(codes.created);
                next();
            });
        }
    })
    .all(function(req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

places.route('/:id/pictures')

    /**
     * @api {get} /places/:id/pictures Request all picture objects
     * @apiName GetPlacePictures
     * @apiGroup Place
     *
     * @apiParam {String} id  Unique ID of the place
     *
     * @apiSuccess {Object[]} Pictures  List of all picture objects the place contains.
     *
     * */
    .get(function (req, res, next) {
        placeModel.findById(req.params.id).populate('pictures').exec(function (err, items) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                res.locals.items = items.pictures;
                res.locals.processed = true;
                next();
            }
        })
    })
    .post(function (req, res, next) {
        var picture = new pictureModel(req.body);
        var picture_id = picture._id;
        var error = false;

        placeModel.findById(req.params.id, function (err, place) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                var picture_array = place.pictures;
                picture_array.push(picture_id);
                placeModel.findByIdAndUpdate(req.params.id, {$set: {pictures: picture_array}}, { runValidators: true , new: true}, function (err) {
                    if (err) {
                        error = true;
                        next(err);
                    }
                })
            }
        });

        if (!error) {
            picture.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.locals.processed = true;

                res.locals.items = picture;
                res.status(codes.created);
                next();
            });
        }
    })
    .all(function (req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

places.route('/qrcode/:id')
    /**
     * @api {get} /places/qrcode/:id Request the place with the QR Code
     * @apiName GetPlaceQRcode
     * @apiGroup Place
     *
     * @apiParam {String} id  ID the QR Code contains
     *
     * @apiSuccess {Object} Place  The requested place object
     *
     * */
    .get(function (req, res, next) {
        placeModel.findOne({'qr_code_id': req.params.id}, function (err, item) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                console.log(item);
                res.locals.items = item; //return item is shown
                res.locals.processed = true;
                next();
            }
        });
    })

    .all(function (req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });


/**
 * This middleware would finally send any data that is in res.locals to the client (as JSON)
 * or, if nothing left, will send a 204.
 */
places.use(function (req, res, next) {
    if (res.locals.items) {
        res.json(res.locals.items);
        delete res.locals.items;
    } else if (res.locals.processed) {
        res.set('Content-Type', 'application/json');
        if (!res.get('Status-Code')) {
            res.status(codes.nocontent);
        }
        res.end();
    } else {
        next(); // will result in a 404 from app.js
    }
});


module.exports = places;