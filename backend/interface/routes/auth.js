'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const AuthorizationController = require('../controllers/AuthorizationController');

router.post('/', AuthorizationController.getAccessToken);

module.exports = router;