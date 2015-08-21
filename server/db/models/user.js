'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    name: {
        first: {
            type: String
        },
        last: {
            type: String
        }
    },
    title: {
        type: String
    },
    role: [{
        type: String,
        enum: ['Admin', 'Student', 'Company'],
        default: 'Student',
        required: true
    }],
    photo: {
        type: String,
        default: "https://lh3.googleusercontent.com/-nW_UEE8QEN4/AAAAAAAAAAI/AAAAAAAAAAA/_AVZs4E6WjQ/photo.jpg",
        unique: true
    },
    cohort: {
        type: Number
    },
    fellow: {
        type: Boolean
    },
    preferences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    currentCompany: {
        type: String,
    },
    socialLinks: {
        linkedin: {
            type: String,
            unique: true
        },
        github: {
            type: String,
            unique: true
        },
        website: {
            type: String
        },
        angellist: {
            type: String,
            unique: true
        }
    },
    resume: {
        type: String,
        unique: true
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function(next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);