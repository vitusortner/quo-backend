/** This module defines the schema for pictures using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/picture
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');

var PictureSchema = new Schema({
    src: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    is_visible: {
        type: Boolean,
        default: true
    } },{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = PictureSchema;
