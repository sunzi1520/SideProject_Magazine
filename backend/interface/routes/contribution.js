'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { changeTitle, createContribution, getContribution, getContributionByFaculty } = require('../controllers/ContributionController');

router.get('/:id', getContribution);
router.get('/faculty/:faculty', getContributionByFaculty);
router.post('/', createContribution);
router.put('/:id', changeTitle);

module.exports = router;