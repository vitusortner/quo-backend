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

    .get(function (req, res, next) {
        placeModel.find({}, function (err, items) {
            res.locals.items = items;
            res.locals.processed = true;
            next();
        });
    })

    .post(function (req, res, next) {

        var place = new placeModel(req.body);
        var host_id = req.body.host;
        var error = false;

        userModel.findById(host_id, function (err, user) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                var hosted_array = user.hosted_places;
                hosted_array.push(place._id);
                userModel.findByIdAndUpdate(host_id, {$set: {hosted_places: hosted_array}}, { runValidators: true , new: true}, function (err) {
                    if (err) {
                        error = true;
                        next(err);
                    }
                })
            }
        });

        if(!error) {
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

    .all(function (req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

places.route('/:id')
    .get(function(req, res,next) {
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

    .put(function(req, res,next) {

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

    .delete(function(req,res,next) {
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
    .get(function(req, res,next) {
        placeModel.findById(req.params.id).populate('components').exec(function(err, items) {
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
    .get(function(req, res,next) {
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

    .get(function(req, res,next) {

        var error = false;
        var user_id = req.params.user_id;

        placeModel.findOne({'qr_code_id': req.params.qr_code_id}, function (err, place) {
            if (err) {
                err = new HttpError(err.message, codes.wrongrequest);
                next(err);
            } else {
                userModel.findById(user_id, function(err, user) {
                    if (err) {
                        error = true;
                        err = new HttpError(err.message, codes.wrongrequest);
                        next(err);
                    } else {
                        var visited_array = user.visited_places;
                        var place_id = place._id;
                        var new_place = {
                            "place_id": place_id,
                            "timestamp": Date.now()
                        };
                        visited_array.push(new_place);
                        userModel.findByIdAndUpdate(user_id, {$set: {visited_places: visited_array}}, { runValidators: true , new: true}, function (err) {
                            if (err) {
                                error = true;
                                next(err);
                            }
                        })
                    }
                });
                if (!error) {
                    res.locals.items = place;
                    res.locals.processed = true;
                    next();
                }
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