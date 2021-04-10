'use strict';

const Comment = require('../../domain/models/Comment');
const MongooseComment = require('../orm/mongoose/schemas/Comment');
const CommentRepository = require('../../domain/repositories/CommentRepository');

module.exports = class extends CommentRepository {

    async persist(commentEntity) {
        const { createdBy, contribution, replyTo, content } = commentEntity;
        const mongooseComment = new MongooseComment({createdBy, contribution, replyTo, content});
        await mongooseComment.save();
        return new Comment(mongooseComment.id, mongooseComment.createdBy, mongooseComment.content, mongooseComment.contribution, mongooseComment.replyTo, undefined, mongooseComment.createdAt, mongooseComment.updatedAt);
    }

    async merge(commentEntity) {

    }

    async remove(commentId) {
        const mongooseComment = await MongooseComment.deleteOne({_id: commentId});
        return new Comment(mongooseComment.id, mongooseComment.createdBy, mongooseComment.content, mongooseComment.contribution, mongooseComment.replyTo, undefined, mongooseComment.createdAt, mongooseComment.updatedAt);
    }

    async get(commentId) {
        const mongooseComments = await MongooseComment.aggregate([
            {$match: {_id: commentId}},
            {$graphLookup: {
                from: 'Comments',
                startWith: '$replyTo',
                connectFromField: 'replyTo',
                connectToField: '_id',
                as: 'replyTo',
            }},
        ]).exec();
        const mongooseComment = mongooseComments[0];
        return new Comment(mongooseComment.id, mongooseComment.createdBy, mongooseComment.content, mongooseComment.contribution, mongooseComment.replyTo, mongooseComment.createdAt, mongooseComment.updatedAt);
    }

    async find() {
        
    }

}