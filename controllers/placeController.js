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
    placeModel = require('../models/place'),
    userModel = require('../models/user'),
    mongoose = require('mongoose'),
    componentSchema = require('../models/component'),
    pictureSchema = require('../models/picture'),
    componentModel = mongoose.model('Component', componentSchema),
    pictureModel = mongoose.model('Picture', pictureSchema);

exports.readAll = function (req, res, next) {
    placeModel.find({}, function (err, items) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        res.locals.items = items;
        res.locals.processed = true;
        next();
    });
};

exports.createAndAddToHostedPlaces = function (req, res, next) {

    const place = new placeModel(req.body);
    const host_id = req.body.host;

    place.validate(function (err) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        userModel.findById(host_id, function (err, user) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                return next(err);
            }
            let hosted_array = user.hosted_places;
            hosted_array.push(place._id);
            const set = {
                $set: {
                    hosted_places: hosted_array
                }
            };
            const validateOptions = {
                runValidators: true,
                new: true
            };
            userModel.findByIdAndUpdate(host_id, set, validateOptions, function (err) {
                if (err) {
                    return next(err);
                }
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
        });
    });
};

exports.readById = function (req, res, next) {
    placeModel.findById(req.params.id, function (err, items) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        res.locals.items = items; //return item is shown
        res.locals.processed = true;
        next();
    });
};

exports.update = function (req, res, next) {
    if (req.params.id !== req.body._id) {
        const err = new HttpError('id of PUT resource and send JSON body are not equal: ' + req.params.id + " " + req.body.id, codes.wrongrequest);
        return next(err);
    }
    placeModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true}, (err, item) => {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        res.locals.processed = true;
        res.locals.items = item;
        res.status(codes.success);
        next();
    });
};

exports.delete = function (req, res, next) {
    placeModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        res.status(codes.success);
        res.locals.processed = true;
        next();
    });
};

exports.populateComponents = function (req, res, next) {
    placeModel.findById(req.params.id)
        .populate('components')
        .exec(function (err, items) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                return next(err);
            }
            res.locals.items = items.components;
            res.locals.processed = true;
            next();
        })
};

exports.createComponent = function (req, res, next) {
    const component = new componentModel(req.body);
    const component_id = component._id;

    placeModel.findById(req.params.id, function (err, place) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        let components_array = place.components;
        components_array.push(component_id);
        const set = {
            $set: {
                components: components_array
            }
        };
        const validateOptions = {
            runValidators: true,
            new: true
        };
        placeModel.findByIdAndUpdate(req.params.id, set, validateOptions, function (err) {
            if (err) {
                return next(err);
            }
            component.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.locals.processed = true;
                res.locals.items = component;
                res.status(codes.created);
                next();
            });
        })
    });
};

exports.populatePictures = function (req, res, next) {
    placeModel.findById(req.params.id)
        .populate('pictures')
        .exec(function (err, items) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                return next(err);
            }
            res.locals.items = items.pictures;
            res.locals.processed = true;
            next();
        })
};

exports.createPicture = function (req, res, next) {
    const picture = new pictureModel(req.body);
    const picture_id = picture._id;

    placeModel.findById(req.params.id, function (err, place) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        let picture_array = place.pictures;
        picture_array.push(picture_id);
        const set = {
            $set: {
                pictures: picture_array
            }
        };
        const validateOptions = {
            runValidators: true,
            new: true
        };
        placeModel.findByIdAndUpdate(req.params.id, set, validateOptions, function (err) {
            if (err) {
                return next(err);
            }
            picture.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.locals.processed = true;
                res.locals.items = picture;
                res.status(codes.created);
                next();
            });
        })
    });
};

exports.readByQrCodeIdAndAddToVisitedPlaces = function (req, res, next) {

    const user_id = req.params.user_id;

    placeModel.findOne({'qr_code_id': req.params.qr_code_id}, function (err, place) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        if (place.host === user_id) {
            res.locals.items = place;
            res.locals.processed = true;
            return next();
        }
        const startDate = place.start;
        console.log(startDate);
        console.log(Date.now());
        userModel.findById(user_id, function (err, user) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                return next(err);
            }
            let visited_array = user.visited_places;
            const new_place = {
                "place_id": place._id,
                "timestamp": Date.now()
            };
            let isNew = true;
            visited_array.forEach(function (item) {
                if (item.place_id.toString() === place._id.toString()) {
                    isNew = false;
                }
            });
            if (isNew) {
                visited_array.push(new_place);
                const set = {
                    $set: {
                        visited_places: visited_array
                    }
                };
                const validateOptions = {
                    runValidators: true,
                    new: true
                };
                userModel.findByIdAndUpdate(user_id, set, validateOptions, function (err) {
                    if (err) {
                        err = new HttpError(err.message, codes.wrongrequest);
                        return next(err);
                    }
                })
            }
            res.locals.items = place;
            res.locals.processed = true;
            return next();
        });
    });
};