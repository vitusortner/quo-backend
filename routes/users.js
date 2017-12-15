/** This module defines the routes for users using mongoose for storing
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/users
 * @type {Router}
 */

// modules
var express = require('express');
var codes = require('../restapi/http-codes');
var HttpError = require('../restapi/http-error.js');
var userModel = require('../models/user');

var users = express.Router();

users.route('/')

    .get(function (req, res, next) {
        userModel.find({}, function (err, items) {
            res.locals.items = items;
            res.locals.processed = true;
            next();
        });
    })

    .post(function (req, res, next) {

        var user = new userModel(req.body);
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.locals.processed = true;

            res.locals.items = user;
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

users.route('/:id')
    .get(function (req, res, next) {
        userModel.findById(req.params.id, function (err, items) {
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

    .put(function (req, res, next) {

        if (req.params.id !== req.body._id) {
            var err = new HttpError('id of PUT resource and send JSON body are not equal: ' + req.params.id + " " + req.body.id, codes.wrongrequest);
            next(err);
            return;
        }

        userModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true}, (err, item) => {
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

    .delete(function (req, res, next) {
        userModel.findByIdAndRemove(req.params.id, function (err) {
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

users.route('/:id/:visited_places')

    .get(function (req, res, next) {
        userModel
            .findById(req.params.id)
            .populate({
                path: 'visited_places.place_id',
                model: 'Place'
            })
            .exec(function (err, items) {
                if (err) {
                    err = new HttpError(err, codes.wrongrequest);
                    next(err);
                } else {
                    res.locals.items = items.visited_places;
                    res.locals.processed = true;
                    next();
                }
            })
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

users.route('/:id/hosted_places')

    .get(function (req, res, next) {
        userModel.findById(req.params.id).populate('hosted_places').exec(function (err, items) {
            if (err) {
                err = new HttpError(err, codes.wrongrequest);
                next(err);
            } else {
                res.locals.items = items.hosted_places;
                res.locals.processed = true;
                next();
            }
        })
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
users.use(function (req, res, next) {
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


module.exports = users;