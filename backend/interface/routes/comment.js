'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { deleteComment } = require('../controllers/CommentController');

router.delete('/:id', deleteComment);

module.exports = router;