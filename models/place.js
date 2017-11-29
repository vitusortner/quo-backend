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
var bcrypt = require('bcrypt-nodejs');

function getDefaultPicture() {
    // TODO function for returning a random default picture
    return "path";
}

function generateQrCodeId(){
    const SALT_FACTOR = 5;

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return err;

        bcrypt.hash(Date.now(), salt, null, function(err, hash) {
            if (err) return err;
            return hash;
        });
    });
}

var PlaceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    title_picture: {
        type: String,
        default: getDefaultPicture
    },
    start: {
        type: Date,
        required: true
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
        type: ObjectId,
        required: true
    },
    qr_code_id: {
        type: String,
        default: generateQrCodeId
    },
    qr_code: {
        type: String
    },
    components: {
        type: [ObjectId]
    },
    settings: {
        isPhotoUploadAllowed: { // are visitors allowed to upload photos to this place?
            type: Boolean,
            default: true
        },
        hasToValidateGPS: { // visitors must verify their location to get access
            type: Boolean,
            default: true
        }
    }},{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = mongoose.model('Place', PlaceSchema);
