var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
  console.log(req.query)
  User.find(req.query).exec()
    .then(function(users) {
      res.json(users);
    })
    .then(null, next);
});

router.get('/companies', function(req, res, next) {
  User.find({
      role: 'company'
    }).exec()
    .then(function(users) {
      res.json(users)
    })
    .then(null, next)
})

router.post('/', function(req, res, next) {
  User.create(req.body)
    .then(function(user) {
      res.status(201).json(user);
    })
    .then(null, next);
});

router.param('id', function(req, res, next, id) {
  User.findById(id).exec()
    .then(function(user) {
      if (!user) throw Error('Not Found');
      req.user = user;
      next();
    })
    .then(null, function(e) {
      // invalid ids sometimes throw cast error
      if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
      next(e);
    });
});


router.get('/:id', function(req, res) {
  res.json(req.user)
});

router.put('/:id', function(req, res, next) {
  _.extend(req.user, req.body);
  req.user.save()
    .then(function(user) {
      res.json(user)
    })
    .then(null, next);
})

router.delete('/:id', function(req, res, next) {
  req.user.remove()
    .then(function() {
      res.status(204).end()
    })
    .then(null, next);
})