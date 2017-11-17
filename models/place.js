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

function getDefaultPicture() {
    // TODO function for returning a random default picture
}

var PlaceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    titlePicture: {
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
        required: true
    },
    qrCode: {
        type: String
    },
    components: {
        type: [ObjectId]
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


module.exports = mongoose.model('Place', PlaceSchema);
