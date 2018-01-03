/** This module defines the routes for authentication
 *
 * @author Nora Koreuber
 *
 * @module routes/auth
 * @type {Router}
 */


"use strict";

// modules
var express = require('express');
var codes = require('../restapi/http-codes');
var HttpError = require('../restapi/http-error.js');
const passport = require('passport');

const jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    config = require('../config/main');

function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 2592000 // 30 days in seconds
    });
}

// Set user info from request
function setUserInfo(user) {
    return {
        _id: user._id,
        email: user.email
    };
}


var auth = express.Router();

auth.route('/login')
    .post(passport.authenticate('local', {session: false}), function(req, res, next){
        let userInfo = setUserInfo(req.user);

        res.locals.items = {
            token: generateToken(userInfo),
            user: userInfo
        };
        res.locals.processed = true;
        next();
    })

    .all(function (req, res, next) {
        if (res.locals.processed) {
            next();
        } else {
            var err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

auth.route('/register')
    .post(function(req, res, next) {
        // Check for registration errors
        const email = req.body.email;
        const password = req.body.password;

        // Return error if no email provided
        if (!email) {
            return res.status(422).send({error: 'You must enter an email address.'});
        }

        // Return error if no password provided
        if (!password) {
            return res.status(422).send({error: 'You must enter a password.'});
        }

        User.findOne({email: email}, function (err, existingUser) {
            if (err) {
                return next(err);
            }

            // If user is not unique, return error
            if (existingUser) {
                return res.status(422).send({error: 'That email address is already in use.'});
            }

            // If email is unique and password was provided, create account
            let user = new User({
                email: email,
                password: password
            });

            user.save(function (err, user) {
                if (err) {
                    return next(err);
                }

                // Respond with JWT if user was created

                let userInfo = setUserInfo(user);

                res.locals.items = {
                    token: generateToken(userInfo),
                    user: userInfo
                };
                res.locals.processed = true;
                next();
            });
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


/**
 * This middleware would finally send any data that is in res.locals to the client (as JSON)
 * or, if nothing left, will send a 204.
 */
auth.use(function (req, res, next) {
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

module.exports = auth;
