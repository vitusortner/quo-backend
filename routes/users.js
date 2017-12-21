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

    /**
     * @api {get} /users Get all users
     * @apiName GetUsers
     * @apiVersion 0.1.0
     * @apiGroup User
     *
     * @apiSuccess {Object[]} users  List of all user Objects.
     *
     * */
    .get(function (req, res, next) {
        userModel.find({}, function (err, items) {
            res.locals.items = items;
            res.locals.processed = true;
            next();
        });
    })

    /**
     * @api {post} /users Create a new User
     * @apiName PostUser
     * @apiVersion 0.1.0
     * @apiGroup User
     *
     * @apiParam {String} email  Required email of the User.
     * @apiParam {String{8..}} password     Required password of the User.
     * @apiParam {Obeject[]} [visited_places] Optional array with visited places.
     * @apiParam {Object} [visitedPlace]
     * @apiParam {String} [visitedPlace.place_id]    ID of the visited place.
     * @apiParam {Date}   [visitedPlace.timestamp]   Date when place is visited.
     * @apiParam {Obeject[]} [hosted_places] Optional array with hosted places.
     * @apiParam {Boolean} [active=true]     Optional active status with default true.
     *
     *
     * @apiParamExample {json} Request-Example:
     *  {
     *      "email":"example@email.com",
     *      "password":"password123",
     *      "visited_places":[
     *          {
     *          "place_id":"123,
     *          "timestamp":"yyyy-MM-dd'T'HH:mm:ss'Z"
     *          }
     *      ],
     *      "hosted_places":[],
     *      "active":true
     *  }
     *
     * @apiSuccess {Object} users  User object that was created.
     *
     * */
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

    /**
     * @api {get} /users/:id Get a single user
     * @apiName GetUser
     * @apiVersion 0.1.0
     * @apiGroup User
     *
     * @apiParam {String} id  The Users-ID
     *
     * @apiSuccess {String} email  User Email
     * @apiSuccess {String} password  Password from User
     * @apiSuccess {Object[]} visited_places  All places visited
     * @apiSuccess {Object[]} hosted_places  All places hosted
     * @apiSuccess {Boolean} active   User Status
     * @apiSuccess {Date} created  Creation Date
     *
     * */
    .get(function(req, res,next) {
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

    /**
     * @api {put} /users/:id Modify a user
     * @apiName PutUser
     * @apiVersion 0.1.0
     * @apiGroup User
     *
     * @apiParam {String} id  The Users-ID
     *
     * @apiParamExample {json} Request-Example:
     *  {
     *      "email":"other@email.com",
     *      "password":"123password",
     *      "visited_places":[
     *          {
     *          "place_id":"321,
     *          "timestamp":"yyyy-MM-dd'T'HH:mm:ss'Z"
     *          }
     *      ],
     *      "hosted_places":[],
     *      "avtive":false
     *  }
     *
     * @apiSuccess {Object} users  Modified user object
     *
     * */
    .put(function(req, res,next) {

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

    /**
     * @api {delete} /users/:id Delete a user
     * @apiName DeleteUser
     * @apiVersion 0.1.0
     * @apiGroup User
     *
     * @apiParam {String} id  The Users-ID
     *
     * */
    .delete(function(req,res,next) {
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

    /**
     * @api {get} /users/:id/visited_places Get all visited places
     * @apiName GetUserVisitedPlaces
     * @apiVersion 0.1.0
     * @apiGroup User
     *
     * @apiParam {String} id  The Users-ID
     *
     * @apiSuccess {Object[]} places  Place objects the user visited
     *
     * */
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

    /**
     * @api {get} /users/:id/hosted_places Get all hosted places
     * @apiName GetUserHostedPlaces
     * @apiVersion 0.1.0
     * @apiGroup User
     *
     * @apiParam {String} id  The Users-ID
     *
     * @apiSuccess {Object[]} places  Place objects the user hosted
     *
     * */
    .get(function(req, res,next) {
        userModel.findById(req.params.id).populate('hosted_places').exec(function(err, items) {
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