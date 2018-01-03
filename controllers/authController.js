/** This module defines the handlers for authentication
 *
 * @author Nora Koreuber
 *
 * @module controllers/auth
 * @type {Controller}
 */


// modules
const codes = require('../restapi/http-codes'),
    jwt = require('jsonwebtoken'),
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

exports.login = function (req, res, next) {
    let userInfo = setUserInfo(req.user);

    res.locals.items = {
        token: generateToken(userInfo),
        user: userInfo
    };
    res.locals.processed = true;
    next();
};

exports.register = function (req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(codes.unprocessableentity).send({error: 'You must enter an email address.'});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(codes.unprocessableentity).send({error: 'You must enter a password.'});
    }

    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(codes.unprocessableentity).send({error: 'That email address is already in use.'});
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
};