'use strict';
var mongoose = require('mongoose');
var searchPlugin = require("mongoose-search-plugin");

var schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    team: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }]
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    awards: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProjectAward",
        }]
    },
    github: {
        type: String,
        required: true
    },
    website: {
        type: String,
    },
    tags: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProjectTag",
        }]
    },
    photo: {
        type: String,
        default: ["http://wiki.solid-run.com/images/7/75/No_image_available.png"]
    },
    category: {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProjectCategory",
        }
    }
});

schema.path('tags').validate(function(value) {
    return (value.length !== 0);
}, 'No tag added');

schema.plugin(searchPlugin, {
    fields: ["title", "description"]
});

mongoose.model('Project', schema);
