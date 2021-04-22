'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { getReport1 } = require('../controllers/ReportController');

router.get('/report1', getReport1);

module.exports = router;