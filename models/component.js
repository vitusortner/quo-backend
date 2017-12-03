/** This module defines the schema for components using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/component
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
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
        type: ObjectId,
        validate:{
            validator: validator.isMongoId,
            message: '{VALUE} is not a valid object id',
            isAsync: false
        }
    } },{
    timestamps: {
        createdAt: 'timestamp'
    }
});


module.exports = ComponentSchema;
