'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { downloadFile, deleteFile, uploadFiles } = require('../controllers/FileController');

router.get('/:id', downloadFile);
router.post('/contribution/:contributionId', uploadFiles)
router.delete('/:id', deleteFile);

module.exports = router;