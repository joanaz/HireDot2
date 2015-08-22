var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
    Project.find(req.query).exec()
        .then(function(projects) {
            res.json(projects);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Project.create(req.body)
        .then(function(project) {
            res.status(201).json(project);
        })
        .then(null, next);
});

router.param('id', function(req, res, next, id) {
    Project.findById(id).exec()
        .then(function(project) {
            if (!project) throw Error('Not Found');
            // project.team.forEach(member => {
            //         User.find({
            //             fullName: member
            //         }).then(res => res[0]))
            // }
            req.project = project;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

router.get('/:id', function(req, res) {
    res.json(req.project);
});

router.put('/:id', function(req, res, next) {
    _.extend(req.project, req.body);
    req.project.save()
        .then(function(project) {
            res.json(project);
        })
        .then(null, next);
});

router.delete('/:id', function(req, res, next) {
    req.project.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

// router.param('userid', function(req, res, next, userid) {
//     User.findById(userid).exec()
//         .then(function(user) {
//             if (!user) throw new Error("User doesn't exist");
//             else {
//                 req.user = user;
//                 next();
//             }
//         })
//         .then(null, next);
// });

// // //for admin to see all users
// router.get("/", function(req, res) {
//     User.find(req.query).then(function(users) {
//         users = users.map(function(user) {
//             return _.omit(user.toJSON(), ['salt', 'password']);
//         });
//         res.send(users);
//     }, function(err) {
//         console.log(err);
//         res.status(403).end();
//     });
// });

// router.get("/:userid", secur.isUserOrAdmin, function(req, res) {
//     res.send(_.omit(req.user.toJSON(), ['salt', 'password']));
// });

// router.post('/create', function(req, res, next) {
//     User.create(req.body)
//         .then(function(user) {
//             req.login(user, function() {
//                 res.status(201).json(_.omit(user.toJSON(), ['salt', 'password']));
//             });
//         })
//         .then(null, next);
// });

// router.put("/:userid", secur.isUserOrAdmin, function(req, res, next) {
//     for (var key in req.body) {
//         req.user[key] = req.body[key];
//     }
//     req.user.save()
//         .then(function(savedUser) {
//             res.json(_.omit(savedUser.toJSON(), ['salt', 'password']));
//         }).then(null, next);
// });

// router.delete("/:userid", secur.isAdmin, function(req, res, next) {
//     req.user.remove().then(function() {
//         res.send(200);
//     }, next);
// });