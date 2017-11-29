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
    password: { // validation
        type: String,
        minlength: 8,
        required: true
    },
    visitedPlaces: {
        type: [ObjectId],
        validate:{ // TODO check if this validation really works
            validator: function(values){
                values.forEach(function(value){
                    if(!validator.isMongoId(value)) return false
                })
            },
            message: '{VALUE} does not contain only valid object IDs',
            isAsync: false
        }
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
    },
    active: {
        type: Boolean,
        default: true
    }},{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = mongoose.model('User', UserSchema);
