'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { getFile, deleteFile } = require('../controllers/FileController');

router.get('/:id', getFile);
router.delete('/:id', deleteFile);

module.exports = router;