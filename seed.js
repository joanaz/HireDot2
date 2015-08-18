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

var seedUsers = function() {

    var users = [{
        name: 'Frances',
        email: 'testing@fsa.com',
        password: 'password',
        role: 'student'
    }, {
        name: 'Joanna',
        email: 'joanaz',
        password: '123',
        role: 'student'
    }, {
        name: 'Violet',
        email: 'violet',
        password: '123',
        role: 'student'
    }, {
        name: 'Theo',
        email: 'violet',
        password: '123',
        role: 'student'
    }, {
        name: 'Jack',
        email: 'violet',
        password: '123',
        role: 'student'
    }, {
        email: 'obama@gmail.com',
        password: 'potus',
        role: 'staff'
    }, {
        name: 'Google',
        password: 'google',
        role: 'company'
    }, {
        name: 'Twitter',
        password: 'twitter',
        role: 'company'
    }, {
        name: 'Facebook',
        password: 'facebook',
        role: 'company'
    }, {
        name: 'LinkedIn',
        password: 'linkedin',
        role: 'company'
    }];

    return User.createAsync(users);

};

connectToDb.then(function() {
    User.removeAsync().then(function() {
            return seedUsers();
        })
        // User.findAsync({}).then(function(users) {
        //         if (users.length === 0) {
        //             return seedUsers();
        //         } else {
        //             console.log(chalk.magenta('Seems to already be user data, exiting!'));
        //             process.kill(0);
        //         }
        //     })
        .then(function() {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        })
        .catch(function(err) {
            console.error(err);
            process.kill(1);
        });
});