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
    userModel = require('../models/user');

exports.readAll = function (req, res, next) {
    userModel.find({}, function (err, items) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        res.locals.items = items;
        res.locals.processed = true;
        next();
    });
};

exports.create = function (req, res, next) {
    const user = new userModel(req.body);
    user.save(function (err) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        res.locals.processed = true;
        res.locals.items = user;
        res.status(codes.created);
        next();
    });
};

exports.readById = function (req, res, next) {
    userModel.findById(req.params.id, function (err, items) {
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
        const err = new HttpError('id of PUT resource and send JSON body are not equal: '
            + req.params.id + " "
            + req.body.id, codes.wrongrequest);
        return next(err);
    }
    userModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true}, (err, item) => {
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
    userModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            err = new HttpError(err.message, codes.wrongrequest);
            return next(err);
        }
        res.status(codes.success);
        res.locals.processed = true;
        next();
    });
};

exports.populateVisitedPlaces = function (req, res, next) {
    userModel
        .findById(req.params.id)
        .populate({
            path: 'visited_places.place_id',
            model: 'Place'
        })
        .exec(function (err, items) {
            if (err) {
                err = new HttpError(err, codes.wrongrequest);
                return next(err);
            }
            res.locals.items = items.visited_places;
            res.locals.processed = true;
            next();
        })
};

exports.populateHostedPlaces = function (req, res, next) {
    userModel
        .findById(req.params.id)
        .populate('hosted_places')
        .exec(function (err, items) {
            if (err) {
                err = new HttpError(err, codes.wrongrequest);
                return next(err);
            }
            res.locals.items = items.hosted_places;
            res.locals.processed = true;
            next();
        })
};
