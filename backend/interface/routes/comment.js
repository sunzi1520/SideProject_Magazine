'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { deleteComment, getAllComments, createComment, updateComment, getCommentsByContribution } = require('../controllers/CommentController');

router.get('/contribution/:contributionId', getCommentsByContribution)
router.get('/:id', getAllComments);
router.get('/', getAllComments);
router.post('/', createComment)
router.delete('/:id', deleteComment);
router.put('/:id', updateComment);

module.exports = router;