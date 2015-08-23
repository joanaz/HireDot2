var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Award = mongoose.model('Award');

router.get('/', function(req, res, next) {
    Award.find(req.query).exec()
        .then(function(awards) {
            res.json(awards);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Award.create(req.body)
        .then(function(award) {
            res.status(201).json(award);
        })
        .then(null, next);
});

router.param('id', function(req, res, next, id) {
    Award.findById(id).exec()
        .then(function(award) {
            if (!award) throw Error('Not Found');
            // award.team.forEach(member => {
            //         User.find({
            //             fullName: member
            //         }).then(res => res[0]))
            // }
            req.award = award;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

router.get('/:id', function(req, res) {
    res.json(req.award);
});

router.put('/:id', function(req, res, next) {
    _.extend(req.award, req.body);
    req.award.save()
        .then(function(award) {
            res.json(award);
        })
        .then(null, next);
});

router.delete('/:id', function(req, res, next) {
    req.award.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});
