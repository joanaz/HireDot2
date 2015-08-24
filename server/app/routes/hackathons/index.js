var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Hackathon = mongoose.model('Hackathon');

router.get('/', function(req, res, next) {
    Hackathon.find(req.query).exec()
        .then(function(hackathons) {
            res.json(hackathons);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Hackathon.create(req.body)
        .then(function(hackathon) {
            res.status(201).json(hackathon);
        })
        .then(null, next);
});

router.param('id', function(req, res, next, id) {
    Hackathon.findById(id).exec()
        .then(function(hackathon) {
            if (!hackathon) throw Error('Not Found');
            // hackathon.team.forEach(member => {
            //         User.find({
            //             fullName: member
            //         }).then(res => res[0]))
            // }
            req.hackathon = hackathon;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

router.get('/:id', function(req, res) {
    res.json(req.hackathon);
});

router.put('/:id', function(req, res, next) {
    _.extend(req.hackathon, req.body);
    req.hackathon.save()
        .then(function(hackathon) {
            res.json(hackathon);
        })
        .then(null, next);
});

router.delete('/:id', function(req, res, next) {
    req.hackathon.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});
