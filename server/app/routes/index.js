'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/awards', require('./awards'));
router.use('/companies', require('./companies'));
router.use('/hackathons', require('./hackathons'));
router.use('/projects', require('./projects'));
router.use('/search', require('./search'));
router.use('/users', require('./users'));

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
    res.status(404).end();
});