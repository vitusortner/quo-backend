/** This module defines the schema for components using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/component
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');

var ComponentSchema = new Schema({
    position: {
        type: Number,
        required: true
    },
    text: {
        type: String
    },
    picture: {
        type: String
    } },{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = ComponentSchema;
