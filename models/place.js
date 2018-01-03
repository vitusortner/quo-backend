/** This module defines the schema for places using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/place
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PlaceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    title_picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        default: Date.now()
    },
    end: {
        type: Date
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    address: {
        name: String,
        street: String,
        city: String,
        zip_code: Number
    },
    host: {
        type: String,
        required: true
    },
    qr_code_id: {
        type: String,
        required: true
    },
    qr_code: {
        type: String
    },
    components: [{
        type: Schema.Types.ObjectId,
        ref: 'Component'
    }],
    pictures: [{
        type: Schema.Types.ObjectId,
        ref: 'Picture'
    }],
    settings: {
        is_photo_upload_allowed: { // are visitors allowed to upload photos to this place?
            type: Boolean,
            default: true
        },
        has_to_validate_gps: { // visitors must verify their location to get access
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: {
        createdAt: 'timestamp'
    }
});

module.exports = mongoose.model('Place', PlaceSchema);
