/** This module defines the schema for users using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/user
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');


var UserSchema = new Schema({
    email: {
        type: String,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        },
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    visited_places: {
        type: [String]
    },
    active: {
        type: Boolean,
        default: true
    }},{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = UserSchema;
