/** This module defines the schema for places using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/place
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var validator = require('validator');

exports.getDefaultPicture = function() {
    // TODO function for returning a random default picture
    return "path";
};

exports.generateQrCodeId = function(){
    return bcrypt.hashSync(Date.now());
};


var PlaceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    title_picture: {
        type: String,
        default: this.getDefaultPicture()
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
      street: { // street and number
          type: String
      },
      city: {
          type: String
      },
      zip_code: {
          type: Number
      }
    },
    host: {
        type: String,
        required: true
    },
    qr_code_id: {
        type: String,
        default: this.generateQrCodeId()
    },
    qr_code: {
        type: String
    },
    components: {
        type: [String]
    },
    settings: {
        is_photo_upload_allowed: { // are visitors allowed to upload photos to this place?
            type: Boolean,
            default: true
        },
        has_to_validate_gps: { // visitors must verify their location to get access
            type: Boolean,
            default: true
        }
    }},{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = PlaceSchema;
