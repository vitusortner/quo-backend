/** This module defines the schema for pictures using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/picture
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var validator = require('validator');

var PictureSchema = new Schema({
    src: { // TODO validate path when we know how it should look like
        type: String,
        required: true
    },
    place: {
        type: ObjectId,
        validate:{
            validator: validator.isMongoId,
            message: '{VALUE} is not a valid object id',
            isAsync: false
        },
        required: true
    },
    owner: {
        type: ObjectId,
        validate:{
            validator: validator.isMongoId,
            message: '{VALUE} is not a valid object id',
            isAsync: false
        },
        required: true
    },
    visible: {
        type: Boolean,
        default: true
    } },{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = PictureSchema;
