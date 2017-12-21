/** This module defines the routes for users using mongoose for storing
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/users
 * @type {Router}
 */

// modules
const express = require('express'),
    userController = require('../controllers/userController');

const users = express.Router();

users.route('/')
    .get(userController.readAll)
    .post(userController.create);

users.route('/:id')
    .get(userController.readById)
    .put(userController.update)
    .delete(userController.delete);

users.route('/:id/visited_places')
    .get(userController.populateVisitedPlaces);

users.route('/:id/hosted_places')
    .get(userController.populateHostedPlaces);

module.exports = users;