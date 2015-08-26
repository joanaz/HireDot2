'use strict';
var mongoose = require('mongoose');
var searchPlugin = require("mongoose-search-plugin");

var schema = new mongoose.Schema({
    title: {
        type: String
            // unique: true,
            // required: true,
            // trim: true
    },
    description: {
        type: String
            // required: true,
            // trim: true
    },
    awards: [{
        // type: String
        type: mongoose.Schema.Types.ObjectId,
        ref: "Award",
    }],
    github: {
        type: String
            // required: true
    },
    website: {
        type: String,
    },
    technologies: [{
        // type: String
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technology",
    }],
    logo: {
        type: String,
        default: ["http://st.depositphotos.com/1987177/3470/v/950/depositphotos_34700099-No-photo-available-or-missing-image.jpg"]
    },
    screenshot: {
        type: String,
        default: ["http://st.depositphotos.com/1987177/3470/v/950/depositphotos_34700099-No-photo-available-or-missing-image.jpg"]
    },
    category: {
        type: String
            // type: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: "ProjectCategory",
            // }
    }
});

// schema.path('tags').validate(function(value) {
//     return (value.length !== 0);
// }, 'No tag added');

schema.plugin(searchPlugin, {
    fields: ["title", "description"]
});

mongoose.model('Project', schema);
