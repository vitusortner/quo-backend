/** This module defines the handlers for users
 *
 * @author Nora Koreuber
 *
 * @module controllers/users
 * @type {Controller}
 */

"use strict";

// modules
var codes = require('../restapi/http-codes');
var HttpError = require('../restapi/http-error.js');
var placeModel = require('../models/place');
var userModel = require('../models/user');
var mongoose = require('mongoose');
var componentSchema = require('../models/component');
var pictureSchema = require('../models/picture');
var componentModel = mongoose.model('Component', componentSchema);
var pictureModel = mongoose.model('Picture', pictureSchema);

exports.readAll = function(req, res, next) {
    placeModel.find({}, function (err, items) {
        res.locals.items = items;
        res.locals.processed = true;
        next();
    });
};

exports.createAndAddToHostedPlaces = function (req, res, next) { // TODO Refactor if else stuff

    var place = new placeModel(req.body);
    var host_id = req.body.host;

    place.validate(function(err) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            next(err);
        } else {
            userModel.findById(host_id, function (err, user) {
                if (err) {
                    err = new HttpError(err.message, codes.wrongrequest);
                    next(err);
                } else {
                    var hosted_array = user.hosted_places;
                    hosted_array.push(place._id);
                    userModel.findByIdAndUpdate(host_id, {$set: {hosted_places: hosted_array}}, {
                        runValidators: true,
                        new: true
                    }, function (err) {
                        if (err) {
                            next(err);
                        } else {
                            place.save(function (err) {
                                if (err) {
                                    return next(err);
                                }
                                res.locals.processed = true;

                                res.locals.items = place;
                                res.status(codes.created);
                                next();
                            });
                        }
                    })
                }
            });
        }
    });
};

exports.readById = function (req, res, next) {
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
};

exports.update = function (req, res, next) {
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
};

exports.delete = function (req, res, next) {
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
};

exports.populateComponents = function(req, res,next) {
    placeModel.findById(req.params.id)
        .populate('components')
        .exec(function(err, items) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                res.locals.items = items.components;
                res.locals.processed = true;
                next();
            }
        })
};

exports.createComponent = function (req, res, next) {
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
};

exports.populatePictures = function(req, res,next) {
    placeModel.findById(req.params.id).populate('pictures').exec(function(err, items) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            next(err);
        } else {
            res.locals.items = items.pictures;
            res.locals.processed = true;
            next();
        }
    })
};

exports.createPicture = function (req, res, next) {
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
};

exports.readByQrCodeIdAndAddToVisitedPlaces = function(req, res,next) {

    var user_id = req.params.user_id;

    placeModel.findOne({'qr_code_id': req.params.qr_code_id}, function (err, place) {
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
};