'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { getReport1, getReport2, getReport3, getReport4 } = require('../controllers/ReportController');

router.get('/statistics/contributions', getReport1);
router.get('/statistics/contributions/year/:year', getReport1);
router.get('/statistics/contributions/pecentage/year/:year', getReport2);
router.get('/statistics/contributors', getReport3);
router.get('/statistics/contributors/year/:year', getReport3);

router.get('/exception/contributionWithoutComment', getReport4);
router.get('/exception/contributionWithoutComment/year/:year', getReport4);
router.get('/exception/contributionWithoutComment/over14/:over14', getReport4);

module.exports = router;