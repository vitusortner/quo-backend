/** This module defines the schema for components using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/component
 */


// modules
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Schema = mongoose.Schema;

var ComponentSchema = new Schema({
    type: {
        type: String,
        enum: ['Text', 'Picture'],
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    text: {
        type: String
    },
    picture: {
        type: ObjectId
    } },{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = mongoose.model('Component', ComponentSchema);
