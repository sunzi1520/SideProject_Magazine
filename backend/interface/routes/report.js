'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { getReport1, getReport2 } = require('../controllers/ReportController');

router.get('/statistics/contributions', getReport1);
router.get('/statictics/year/:year', getReport2);

module.exports = router;