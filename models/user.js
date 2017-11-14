/** This module defines the schema for users using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/user
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        type: [mongoose.Schema.Types.ObjectId]
    },
    notificationSettings: {
        updatedContent: {
            type: Boolean,
            default: true
        },
        newPhotos: {
            type: Boolean,
            default: true
        }
    }},{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = mongoose.model('User', UserSchema);
