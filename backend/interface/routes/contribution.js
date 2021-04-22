'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { changeTitle, createContribution, getContribution, getContributionByFaculty, listContributions, listContributionsByAccount, listContributionsBySelf, selectContribution, deselectContribution, getSelectedContributions, getSelectedContributionsByFaculty, getSelectedContributionsByAccount, listContributions_UltimateUniversalVersion } = require('../controllers/ContributionController');

router.get('/magazine/:magazineId/selected/:isSelected', listContributions_UltimateUniversalVersion);
router.get('/magazine/:magazineId', listContributions_UltimateUniversalVersion);
router.get('/selected', getSelectedContributions);
router.get('/faculty/:faculty/selected', getSelectedContributionsByFaculty);
router.get('/faculty/:faculty', getContributionByFaculty);
router.get('/account/:accountId/selected', getSelectedContributionsByAccount);
router.get('/account/:accountId', listContributionsByAccount);
router.get('/account/', listContributionsBySelf);
router.get('/:id', getContribution);
router.get('/', listContributions_UltimateUniversalVersion);

router.post('/', createContribution);

router.put('/:id', changeTitle);
router.put('/:id/select', selectContribution);
router.put('/:id/deselect', deselectContribution);

module.exports = router;