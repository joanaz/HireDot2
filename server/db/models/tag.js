"use strict";
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: {
      type: String
    }
});

mongoose.model("ProjectTag", schema);