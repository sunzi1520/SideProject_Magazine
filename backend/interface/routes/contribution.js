'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { updateContribution, createContribution } = require('../controllers/ContributionController');

router.post('/', createContribution);
router.put('/:id', updateContribution);

module.exports = router;