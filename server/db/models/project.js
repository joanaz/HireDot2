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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    winnerCategory: {
        type: String,
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
            ref: "Tag",
            required: true
        }]
    },
    photo: {
        type: String,
        default: ["http://wiki.solid-run.com/images/7/75/No_image_available.png"]
    }
});

schema.path('category').validate(function(value){
    return (value.length !== 0);
}, 'No category added');

schema.plugin(searchPlugin, {
    fields: ["title", "description"]
});

mongoose.model('Project', schema);
