/** This module defines the schema for places using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/place
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var validator = require('validator');

function getDefaultPicture() {
    // TODO function for returning a random default picture
}

var PlaceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    titlePicture: { // TODO validate path when we know how it should look like
        type: String,
        default: getDefaultPicture
    },
    start: {
      type: Date,
      default: Date.now()
    },
    end: {
      type: Date
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    host: {
        type: ObjectId,
        validate:{
            validator: validator.isMongoId,
            message: '{VALUE} is not a valid object id',
            isAsync: false
        },
        required: true
    },
    qrCode: {
        type: String
    },
    components: {
        type: [ObjectId],
        validate:{
            validator: validator.isMongoId,
            message: '{VALUE} is not a valid object id',
            isAsync: false
        }
    },
    settings: {
        visitorPhotos: { // are visitors allowed to upload photos to this place?
            type: Boolean,
            default: true
        },
        validateGPS: { // visitors must verify their location to get access
            type: Boolean,
            default: true
        }
    }},{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = PlaceSchema;
