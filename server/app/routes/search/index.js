"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
module.exports = router;
var Promise = require("bluebird");

var User = Promise.promisifyAll(mongoose.model("User"));
var Project = Promise.promisifyAll(mongoose.model("Project"));
var Hackathon = Promise.promisifyAll(mongoose.model("Hackathon"));
var Tag = Promise.promisifyAll(mongoose.model("ProjectTag"));

var userSearch = function(string) {
    return new Promise(function(resolve, reject) {
        User.search(string, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

var projectSearch = function(string) {
    return new Promise(function(resolve, reject) {
        Project.search(string, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

var hackathonSearch = function(string) {
    return new Promise(function(resolve, reject) {
        Hackathon.search(string, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

var tagSearch = function(string) {
    return new Promise(function(resolve, reject) {
        Tag.search(string, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

router.get("/:searchString", function(req, res, next) {
    userSearch(decodeURI(req.params.searchString)).then(function(users) {
        res.json(users);
    }, next);
    projectSearch(decodeURI(req.params.searchString)).then(function(projects) {
        res.json(projects);
    }, next);
    hackathonSearch(decodeURI(req.params.searchString)).then(function(hackathons) {
        res.json(hackathons);
    }, next);
    tagSearch(decodeURI(req.params.searchString)).then(function(tags) {
        res.json(tags);
    }, next);
});