"use strict";
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: {
      type: String
    },
    photo: {
      type: String
    },
    description: {
      type: String
    }
});

mongoose.model("Award", schema);