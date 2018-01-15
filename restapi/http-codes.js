/**
 * mini-module providing the HTTP Status codes
 * #
 * @author Nora Koreuber, Florian Schlueter
 * @module http-codes
 */
"use strict";
module.exports = {
    success: 200,
    created: 201,
    nocontent: 204,
    wrongrequest: 400,
    notfound: 404,
    wrongmethod: 405,
    conflict: 409,
    wrongdatatyperequest: 406,
    gone: 410,
    wrongmediasend: 415,
    unprocessableentity: 422,
    locked: 423,
    servererror: 500
};
