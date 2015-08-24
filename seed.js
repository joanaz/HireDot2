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

var Award = Promise.promisifyAll(mongoose.model("Award"));
// var Category = Promise.promisifyAll(mongoose.model("Category"));
var Company = Promise.promisifyAll(mongoose.model("Company"));
var Hackathon = Promise.promisifyAll(mongoose.model("Hackathon"));
var Project = Promise.promisifyAll(mongoose.model("Project"));
var Technology = Promise.promisifyAll(mongoose.model("Technology"));
var User = Promise.promisifyAll(mongoose.model("User"));

var awardsSeeds = require('./seeds/awards.js');
// var categoriesSeeds = require('./seeds/categories.js');
var companiesSeeds = require('./seeds/companies.js');
var hackathonsSeeds = require('./seeds/hackathons.js');
var projectsSeeds = require('./seeds/projects.js');
var technologiesSeeds = require('./seeds/technologies.js');
var usersSeeds = require('./seeds/students.js');

var seedAwards = function() {
    return Award.createAsync(awardsSeeds);
};

// var seedCategories = function() {
//     return Category.createAsync(categories);
// };

var seedCompanies = function() {
    return Company.createAsync(companiesSeeds);
};

var seedHackathons = function() {
    return Hackathon.createAsync(hackathonsSeeds);
};

var seedTechnologies = function() {
    return Technology.createAsync(technologiesSeeds);
};

var seedTechnologies = function() {
    return Technology.createAsync(technologiesSeeds);
};

var seedProjects = function() {
    return Project.createAsync(projectsSeeds);
};

var seedUsers = function() {
    return User.createAsync(usersSeeds);
};

// var seedProjects = function() {
//     return Award.findAsync({})
//         .then(function(awards) {
//             projectsSeeds.forEach(function(project) {
//                 if (project.awards) {
//                     project.awards = project.awards.map(function(projectAward) {
//                         awards.forEach(function(award) {
//                             if (award.name === projectAward) {
//                                 projectAward = award._id;
//                             }
//                         });
//                         return projectAward;
//                     });

//                 }
//             });
//             return Technology.findAsync({});
//         })
//         .then(function(technologies) {
//             projectsSeeds.forEach(function(project) {
//                 project.technologies = project.technologies.map(function(projectTech) {
//                     technologies.forEach(function(technology) {
//                         if (technology.name === projectTech) {
//                             projectTech = technology._id;
//                         }
//                     });
//                     return projectTech;
//                 });
//             });

//             return Project.createAsync(projectsSeeds);
//         });
// };


// var seedUsers = function() {
//     return Project.findAsync({})
//         .then(function(projects) {
//             usersSeeds.forEach(function(user) {
//                 if (user.projects) {
//                     user.projects = user.projects.map(function(userproject) {
//                         projects.forEach(function(project) {
//                             if (project.title === userproject) {
//                                 userproject = project._id;
//                             }
//                         });
//                         return userproject;
//                     });

//                     // console.log(user.projects)

//                 }
//             });
//             // console.log(usersSeeds)
//             return User.createAsync(usersSeeds);
//         });
// };

var dropDatabase = function() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.db.dropDatabase(function(err, result) {
            if (err) reject(err);
            else {
                resolve(result);
            }
        });
    });
};

connectToDb.then(function() {
    dropDatabase().then(function() {
        return seedAwards();
    }).then(function() {
        return seedCompanies();
    }).then(function() {
        return seedHackathons();
    }).then(function() {
        return seedProjects();
    }).then(function() {
        return seedUsers();
    }).then(function() {
        return seedTechnologies();
    }).then(function() {
        console.log(chalk.green("Seed successful!"));
        process.kill(0);
    }).catch(function(err) {
        console.error(err);
        process.kill(1);
    });
});

// connectToDb.then(function() {
//     // Project.removeAsync()
//     //     .then(function() {
//     //         return seedProjects()
//     //     })
//     // User.findAsync({}).then(function(users) {
//     //         if (users.length === 0) {
//     //             return seedUsers();
//     //         } else {
//     //             console.log(chalk.magenta('Seems to already be user data, exiting!'));
//     //             process.kill(0);
//     //         }
//     //     })
//     // seedUsers();
//     seedAwards();
//     seedProjects();
//     seedCompanies();
//     seedHackathons()
//         // ProjectAward.findAsync({}).then(function(awards) {
//         //         if (awards.length === 0) {
//         //             return seedAwards();
//         // Technology.removeAsync()
//         //     .then(function() {
//         //         return seedTechnologies()
//         //     })
//         // Award.findAsync({}).then(function(awards) {
//         //         if (awards.length === 0) {
//         //             return seedAwards();
//         //         } else {
//         //             return
//         //         }
//         //     })
//         //     .then(function() {
//         //         Company.findAsync({}).then(function(companies) {
//         //             if (companies.length === 0) {
//         //                 return seedCompanies()
//         //             } else return
//         //         })
//         //     })
//         // .then(function() {
//         //     return
//     User.removeAsync()
//         // })
//         .then(function() {
//             return seedUsers()
//         })
//         //     User.findAsync({}).then(function(users) {
//         //         if (users.length === 0) {
//         //             return seedUsers();
//         //         } else {
//         //             return
//         //             // console.log(chalk.magenta('Seems to already be user data, exiting!'));
//         //             // process.kill(0);
//         //         }
//         //     })
//         // })
//         .then(function() {
//             console.log(chalk.green('Seed successful!'));
//             process.kill(0);
//         })
//         .catch(function(err) {
//             console.error(err);
//             process.kill(1);
//         });
// });
