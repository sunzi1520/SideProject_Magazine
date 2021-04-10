'use strict';

const Comment = require('../../domain/models/Comment');

module.exports = {
    
    CreateComment(createdBy, contribution, replyTo, content, {commentRepository}) {
        const comment = new Comment(null, createdBy, content, contribution, replyTo);
        return commentRepository.persist(comment);
    },

    DeleteComment(commentId, {commentRepository}) {
        return commentRepository.remove(commentId);
    },

    async GetComment(commentId, {commentRepository}) {
        const comment = await commentRepository(commentId)
    }

}