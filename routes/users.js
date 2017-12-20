/** This module defines the routes for users using mongoose for storing
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module routes/users
 * @type {Router}
 */

// modules
var express = require('express');
var userController = require('../controllers/userController');
var controller = require('../controllers/controller');

var users = express.Router();

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

users.use(controller.methodNotAllowed);
users.use(controller.sendToClient);

module.exports = users;