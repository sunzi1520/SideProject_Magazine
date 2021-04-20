'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { changeTitle, createContribution, getContribution, getContributionByFaculty, listContributions, listContributionsByAccount, listContributionsBySelf } = require('../controllers/ContributionController');

router.get('/', listContributions);
router.get('/account/', listContributionsBySelf);
router.get('/account/:accountId', listContributionsByAccount);
router.get('/:id', getContribution);
router.get('/faculty/:faculty', getContributionByFaculty);
router.post('/', createContribution);
router.put('/:id', changeTitle);

module.exports = router;