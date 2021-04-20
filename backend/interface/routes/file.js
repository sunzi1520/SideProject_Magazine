'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { downloadFile, deleteFile, uploadFiles } = require('../controllers/FileController');
const { verifyAccessToken } = require('../controllers/AuthorizationController');

router.get('/:id', downloadFile);
router.post('/contribution/:contributionId', verifyAccessToken, uploadFiles)
router.delete('/:id', verifyAccessToken, deleteFile);

module.exports = router;