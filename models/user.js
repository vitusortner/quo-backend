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
        unique: true,
        validate: {
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
    visited_places: [{
        _id: false, // so no _id field is added to the subschema
        place_id: {
            type: Schema.Types.ObjectId,
            ref: 'Place'
        },
        timestamp: Date
    }],
    hosted_places: [{
        type: Schema.Types.ObjectId,
        ref: 'Place'
    }],
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = mongoose.model('User', UserSchema);
