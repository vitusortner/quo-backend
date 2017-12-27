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
var userModel = require('../models/user');
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
     * @apiVersion 0.1.0
     * @apiGroup Place
     *
     * @apiSuccess {Object[]} places  List of all place Objects.
     *
     * */
    .get(function (req, res, next) {
        placeModel.find({}, function (err, items) {
            res.locals.items = items;
            res.locals.processed = true;
            next();
        });
    })

    /**
     * @api {post} /places Create a new place
     * @apiName PostPlace
     * @apiVersion 0.1.0
     * @apiGroup Place
     *
     * @apiParam {String}   title               Required title of the place.
     * @apiParam {String}   title_picture       URL to the file.
     * @apiParam {String}   description         Short description.
     * @apiParam {Date}     [start=Now]         Optional start date.
     * @apiParam {Date}     [end]               Optional end date.
     * @apiParam {Number}   lat                 Required latitude value.
     * @apiParam {Number}   long                Required longitude value.
     * @apiParam {Object}   [address]           Optional address object.
     * @apiParam {String}   [address.street]    Optional address Street.
     * @apiParam {String}   [address.city]      Optional address city.
     * @apiParam {Number}   [address.zip_code]  Optional address zip code.
     * @apiParam {String}   host                ID of the user who is host.
     * @apiParam {String}   qr_code_id          ID that is saved in QR Code.
     * @apiParam {String}   [qr_code]           URL to the file.
     * @apiParam {Object[]} [components]        ID's from components the place contains
     * @apiParam {Object[]} [pictures]          ID's from pictures the place contains
     * @apiParam {Object}   [settings]          Optional settings object
     * @apiParam {Boolean}  [settings.is_photo_upload_allowd=true]     Are users allowed to upload images to the place gallery.
     * @apiParam {Boolean}  [settings.has_to_validate_gps=true]        Are users required to be at the geological location of the place.
     *
     * @apiParamExample {json} Request-Example:
     *{
     *           "title":"Example Place",
     *           "title_picture":"www.s3.com",
     *           "description":"A example place description"
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
     *           "qr_code":"www.s3.com",
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
        var picture = new pictureModel(req.body);
        var picture_id = picture._id;

        placeModel.findById(req.params.id, function (err, place) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                var picture_array = place.pictures;
                picture_array.push(picture_id);
                placeModel.findByIdAndUpdate(req.params.id, {$set: {pictures: picture_array}}, { runValidators: true , new: true}, function (err) {
                    if (err) {
                        next(err);
                    } else {
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
            }
        });
    })

    .all(function (req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    })

places.route('/:id')

    /**
     * @api {get} /places/:id Get a single place
     * @apiName GetPlace
     * @apiVersion 0.1.0
     * @apiGroup Place
     *
     * @apiParam {String} id Unique Place-ID
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *   "_id": "12345",
     *   "updatedAt": "yyyy-MM-dd'T'HH:mm:ss'Z",
     *   "timestamp": "yyyy-MM-dd'T'HH:mm:ss'Z",
     *   "host": "87654",
     *   "title": "Example Place",
     *   "lat": 42,
     *   "long": 42,
     *   "qr_code_id": "378fz38rvh38rg",
     *   "qr_code": "www.s3.com"
     *   "title_picture": "www.s3.com",
     *   "description": "Schockt",
     *   "__v": 0,
     *   "settings": {
     *       "has_to_validate_gps": true,
     *       "is_photo_upload_allowed": true
     *   },
     *   "pictures": [],
     *   "components": [],
     *   "start": "yyyy-MM-dd'T'HH:mm:ss'Z",
     *   "end": "yyyy-MM-dd'T'HH:mm:ss'Z"
     * }
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
     * @apiVersion 0.1.0
     * @apiGroup Place
     *
     * @apiParam {String}    _id              ID of the place you want to modifiy.
     * @apiParam {String}   [title]           Required title of the Place.
     * @apiParam {String}   [title_picture]   URL to the file.
     * @apiParam {String}   [description]         Short description.
     * @apiParam {Date}     [start=Now]         Optional start date.
     * @apiParam {Date}     [end]               Optional end date.
     * @apiParam {Number}   [lat]                 Required latitude value.
     * @apiParam {Number}   [long]                Required longitude value.
     * @apiParam {Object}   [address]           Optional address object.
     * @apiParam {String}   [address.street]    Optional address Street.
     * @apiParam {String}   [address.city]      Optional address city.
     * @apiParam {Number}   [address.zip_code]  Optional address zip code.
     * @apiParam {String}   [host]                ID of the user who is host.
     * @apiParam {String}   [qr_code_id          ID that is saved in QR Code.
     * @apiParam {String}   [qr_code]       URL to the file.
     * @apiParam {Object[]} [components]        ID's from Components the place contains
     * @apiParam {Object[]} [pictures]          ID's from pictures the place contains
     * @apiParam {Object}   [settings]          Optional settings object
     * @apiParam {Boolean}  [settings.is_photo_upload_allowd=true]     Are users allowed to upload images to the place gallery.
     * @apiParam {Boolean}  [settings.has_to_validate_gps=true]        Are users required to be at the geological location of the place.
     *
     * @apiParamExample {json} Request-Example:
     *{
     *           "_id":"12345",
     *           "title":"Other Place",
     *           "title_picture":"www.s3.com",
     *           "description":"Other description",
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
     *           "qr_code":"www.s3.com",
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

        placeModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true, new: true},(err, item) => {
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
     * @api {delete} /places/:id Delete a place
     * @apiName DeletePlace
     * @apiVersion 0.1.0
     * @apiGroup Place
     *
     * @apiParam {String} id  Unique ID of the place you want to delete
     *
     * */
    .delete(function (req, res, next) {
        placeModel.findByIdAndRemove(req.params.id, function (err) {
            if (err){
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                res.status(codes.success);
                res.locals.processed = true;
                next();
            }
        });
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

places.route('/:id/components')

    /**
     * @api {get} /places/:id/components Get all component objects
     * @apiName GetPlaceComponents
     * @apiVersion 0.1.0
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
     * @api {post} /places/:id/components Create a new component
     * @apiName PostPlaceComponent
     * @apiVersion 0.1.0
     * @apiGroup Place
     *
     * @apiParam {Number} position              Position of the component.
     * @apiParam {String} [text=null]           Components can have text OR picture.
     * @apiParam {String} [picture=null]        Components can have text OR picture.
     *
     *
     * @apiParamExample {json} Request-Example:
     *{
     *           "position":"1",
     *           "text":"Example Text",
     *           "picture":"www.s3.com",
     *  }
     *
     * @apiSuccess {Object} component  Component object that was created and added to the place.
     *
     * */
    .post(function (req, res, next) {
        var component = new componentModel(req.body);
        var component_id = component._id;

        placeModel.findById(req.params.id, function (err, place) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                var components_array = place.components;
                components_array.push(component_id);
                placeModel.findByIdAndUpdate(req.params.id, {$set: {components: components_array}}, { runValidators: true , new: true}, function (err) {
                    if (err) {
                        next(err);
                    } else {
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
            }
        });
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
     * @api {get} /places/:id/pictures Get all picture objects
     * @apiName GetPlacePictures
     * @apiVersion 0.1.0
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

    /**
     * @api {post} /places/:id/pictures Create a new picture
     * @apiName PostPlacePicture
     * @apiVersion 0.1.0
     * @apiGroup Place
     *
     * @apiParam {String} src                   URL to the file.
     * @apiParam {String} place                 ID of the place.
     * @apiParam {String} owner                 ID of the user who is owner.
     * @apiParam {Boolean} [is_visible=true]    Is the place visible.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *      "src":"www.s3.com",
     *      "place":"12345",
     *      "owner":"54321",
     *      "is_visible":true
     * }
     *
     * @apiSuccess {Object} picture  Picture object that was created and added to the place.

     * */
    .post(function (req, res, next) {
        var picture = new pictureModel(req.body);
        var picture_id = picture._id;

        placeModel.findById(req.params.id, function (err, place) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                var picture_array = place.pictures;
                picture_array.push(picture_id);
                placeModel.findByIdAndUpdate(req.params.id, {$set: {pictures: picture_array}}, { runValidators: true , new: true}, function (err) {
                    if (err) {
                        next(err);
                    } else {
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
            }
        });
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

places.route('/qrcode/:qr_code_id/:user_id')

    /**
     * @api {get} /places/:qr_code_id/:user_id Get the place with the QR Code
     * @apiName GetPlaceQRcode
     * @apiVersion 0.1.0
     * @apiGroup Place
     *
     * @apiParam {String} qr_code_id  ID the QR Code contains
     * @apiParam {String} user_id     ID of the user who scans the QR Code
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
                if(place.host === user_id){
                    res.locals.items = place;
                    res.locals.processed = true;
                    next();
                } else {
                    userModel.findById(user_id, function (err, user) {
                        if (err) {
                            err = new HttpError(err.message, codes.wrongrequest);
                            next(err);
                        } else {
                            var visited_array = user.visited_places;
                            var new_place = {
                                "place_id": place._id,
                                "timestamp": Date.now()
                            };
                            var isNew = true;
                            visited_array.forEach(function (item) {
                                if (item.place_id.toString() === place._id.toString()) {
                                    isNew = false;
                                }
                            });
                            if (isNew) {
                                visited_array.push(new_place);
                                userModel.findByIdAndUpdate(user_id, {$set: {visited_places: visited_array}}, {
                                    runValidators: true,
                                    new: true
                                }, function (err) {
                                    if (err) {
                                        err = new HttpError(err.message, codes.wrongrequest);
                                        next(err);
                                    } else {
                                        res.locals.items = place;
                                        res.locals.processed = true;
                                        next();
                                    }
                                })
                            }
                        }
                    });
                }
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
places.use(function(req, res, next){
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