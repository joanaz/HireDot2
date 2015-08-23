/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var usersSeeds = require('./seeds/students.js');
var Company = Promise.promisifyAll(mongoose.model('Company'));
var companiesSeeds = require('./seeds/companies.js');
var Award = Promise.promisifyAll(mongoose.model('Award'));
var awardsSeeds = require('./seeds/awards.js');
var Project = Promise.promisifyAll(mongoose.model('Project'));
var projectsSeeds = require('./seeds/projects.js');

var seedUsers = function() {
    return User.createAsync(usersSeeds)
}
var seedCompanies = function() {
    return Company.createAsync(companiesSeeds)
}
var seedAwards = function() {
    return Award.createAsync(awardsSeeds)
}
var seedProjects = function() {
    return Project.createAsync(projectsSeeds)
}

connectToDb.then(function() {
    // User.removeAsync()
    //     .then(function() {
    //         return seedUsers()
    //     })
    User.findAsync({}).then(function(users) {
            if (users.length === 0) {
                return seedUsers();
            } else {
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
                process.kill(0);
            }
        })
        // seedCompanies()
        // ProjectAward.findAsync({}).then(function(awards) {
        //         if (awards.length === 0) {
        //             return seedAwards();
        //         } else {
        //             return ""
        //         }
        //     })
        // .then(function() {
        //     return Project.removeAsync()
        //         .then(function() {
        //             return seedProjects()
        //         })
        // })
        .then(function() {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        })
        .catch(function(err) {
            console.error(err);
            process.kill(1);
        });
});