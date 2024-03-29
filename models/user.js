/** This module defines the schema for users using mongoose.
 *
 * @author Nora Koreuber, Florian Schlüter
 *
 * @module models/user
 */


// modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var validator = require('validator');


var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        },
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    visited_places: [{
        _id: false, // so no _id field is added to the subschema
        place_id: {
            type: Schema.Types.ObjectId,
            ref: 'Place'
        },
        timestamp: Date
    }],
    hosted_places: [{
        type: Schema.Types.ObjectId,
        ref: 'Place'
    }],
    active: {
        type: Boolean,
        default: true
    }},{
    timestamps: {
        createdAt: 'timestamp'
    }
});

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {
    const user = this,
        SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);
