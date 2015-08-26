var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Technology = mongoose.model('Technology');
var Project = mongoose.model('Project');

router.get('/', function(req, res, next) {
    Technology.find(req.query).exec()
        .then(function(technologies) {
            res.json(technologies);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Technology.create(req.body)
        .then(function(technology) {
            res.status(201).json(technology);
        })
        .then(null, next);
});

router.param('id', function(req, res, next, id) {
    Technology.findById(id).exec()
        .then(function(technology) {
            if (!technology) throw Error('Not Found');
            req.technology = technology;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

router.get('/:id', function(req, res) {
    res.json(req.technology);
});

router.get('/:id/projects', function(req, res, next) {
    Project.find({
            technologies: {
                $elemMatch: {
                    $eq: req.params.id
                }
            }
        })
        .populate('technologies')
        .exec()
        .then(projects => {
            res.json(projects)
        })
        .then(null, next);
});

router.put('/:id', function(req, res, next) {
    _.extend(req.technology, req.body);
    req.technology.save()
        .then(function(technology) {
            res.json(technology);
        })
        .then(null, next);
});

router.delete('/:id', function(req, res, next) {
    req.technology.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});