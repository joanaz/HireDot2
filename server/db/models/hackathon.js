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
    numberWins: {
        type: Number
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    projects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Project",
    },
    website: {
        type: String,
    },
    photo: {
        type: String,
        default: ["http://wiki.solid-run.com/images/7/75/No_image_available.png"]
    }
});

schema.plugin(searchPlugin, {
    fields: ["title", "description"]
});

mongoose.model('Hackathon', schema);