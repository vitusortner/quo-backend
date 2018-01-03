/** This module defines the schema for components using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/component
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComponentSchema = new Schema({
    position: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        default: null
    },
    picture: {
        type: String,
        default: null
    }
}, {
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = ComponentSchema;
