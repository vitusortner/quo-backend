/** This module defines the routes for authentication
 *
 * @author Nora Koreuber
 *
 * @module routes/auth
 * @type {Router}
 */


"use strict";

// modules
const express = require('express'),
    passport = require('passport'),
    authController = require('../controllers/authController');

const auth = express.Router();

auth.route('/login')
    .post(passport.authenticate('local', {session: false}), authController.login);

auth.route('/register')
    .post(authController.register);

module.exports = auth;
