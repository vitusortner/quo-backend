/** This module defines the routes for places using mongoose for storing
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/places
 * @type {Router}
 */

// remember: in modules you have 3 variables given by CommonJS
// 1.) require() function
// 2.) module.exports
// 3.) exports (which is module.exports)

// modules
var express = require('express');
var codes = require('../restapi/http-codes');
var HttpError = require('../restapi/http-error.js');

var mongoose = require('mongoose'); // object represents mongoose framework, possible to use all methods of mongoose
var placeModel = require('../models/place');
var componentSchema = require('../models/component');
var componentModel = mongoose.model('Component', componentSchema);
var places = express.Router();

places.route('/')
    .get(function (req, res, next) {
        placeModel.find({}, function (err, items) {
            res.locals.items = items; //all items from array are saved locally to be shown
            res.locals.processed = true; //being used for HttpError
            next();
        });
    })

    .post(function (req, res, next) {

        var place = new placeModel(req.body); //take what is in body and use pinModel

        place.save(function (err) { //validation by mongoose
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
    .get(function (req, res, next) {

        placeModel.findById(req.params.id).lean().exec(function (err, item) {

            _.each(item.components, function (compid) {
                componentModel.findById(compid, function (err, q) {
                    sq.question = q;

                });
            });
        });
        console.log(item);
        res.locals.items = item; //return item is shown
        res.locals.processed = true;
        next();


        // placeModel.findById(req.params.id, function (err, item) {
        //     if (err) {
        //         err = new HttpError('place not found by id'+ req.params.id + 'at ' + req.originalUrl, codes.notfound);
        //         next(err);
        //     } else {
        //         let components = item.components;
        //         components.forEach(function (id) {
        //             componentModel.findById(id, function (err, component) {
        //                 if (err) {
        //                     err = new HttpError('component not found by id'+ id + 'at ' + req.originalUrl, codes.notfound);
        //                     next(err);
        //                 } else {
        //                     console.log(component);
        //                 }
        //             })
        //         });
        //         console.log(item);
        //         res.locals.items = item; //return item is shown
        //         res.locals.processed = true;
        //         next();
        //     }
        // });
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