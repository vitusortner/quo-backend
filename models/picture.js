/** This module defines the schema for pictures using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/picture
 */


// modules
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Schema = mongoose.Schema;

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


module.exports = mongoose.model('Picture', PictureSchema);
