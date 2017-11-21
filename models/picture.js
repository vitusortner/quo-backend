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

var PictureSchema = new Schema({
    src: {
        type: String,
        required: true
    },
    place: {
        type: ObjectId,
        required: true
    },
    owner: {
        type: ObjectId,
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
