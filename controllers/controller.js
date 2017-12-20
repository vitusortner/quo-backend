/** This module defines the general controller functions
 *
 * @author Nora Koreuber
 *
 * @module controllers/controller
 * @type {Controller}
 */

// modules
var codes = require('../restapi/http-codes');
var HttpError = require('../restapi/http-error.js');

exports.methodNotAllowed = function (req, res, next) {
    if (res.locals.processed) {
        next();
    } else {
        const err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
        next(err);
    }
};

exports.sendToClient = function (req, res, next) {
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
};

//TODO populate what and where