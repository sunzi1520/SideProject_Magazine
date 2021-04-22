'use strict';

const Comment = require('../../domain/models/Comment');

module.exports = {
    
    CreateComment(createdBy, contribution, content, {commentRepository}) {
        const comment = new Comment(null, createdBy, content, contribution);
        return commentRepository.persist(comment);
    },

    async UpdateComment(commentId, content, {commentRepository}) {
        const oldComment = await commentRepository.get(commentId);
        if (!oldComment && !oldComment.id) {
            throw new Error('ERR_COMMENT_NOT_EXISTING');
        }
        const comment = new Comment(commentId, null, content, null);
        oldComment.merge(comment);
        return commentRepository.merge(oldComment);
    },

    DeleteComment(commentId, {commentRepository}) {
        return commentRepository.remove(commentId);
    },

    GetComment(commentId, {commentRepository}) {
        return commentRepository.commentRepository(commentId)
    },

    GetCommentsByContribution(contributionId, {commentRepository}) {
        return commentRepository.getByContribution(contributionId);
    },

    GetAllComments({commentRepository}) {
        return commentRepository.getAll();
    }

}