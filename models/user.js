/** This module defines the schema for users using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/user
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    visitedPlaces: {
        type: [ObjectId]
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
