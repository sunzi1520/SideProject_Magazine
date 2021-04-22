'use strict';

const { DeleteComment, CreateComment, UpdateComment, GetAllComments, GetComment, GetCommentsByContribution } = require('../../application/use-cases/CommentUseCases');

module.exports = {
    async createComment(req, res, next) {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const { id } = req.payload;
        const { contribution, content } = req.body;

        try {
            
            //Process
            const comment = await CreateComment(id, contribution, content, serviceLocator);
            console.log(comment);

            //Output
            return res.status(200).send({
                exitcode: 0,
                comment: serviceLocator.commentSerializer.serialize(comment),
                message: ''
            })
        } catch(err) {
            res.status(500).send({
                exitcode: err.code || 1,
                comment: {},
                message: err.message || err || 'Unknown'
            })
        }
    },

    async updateComment(req, res, next) {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const { id } = req.params;
        const { content } = req.body;

        try {
            
            //Process
            const comment = await UpdateComment(id, content, serviceLocator);

            //Output
            return res.status(200).send({
                exitcode: 0,
                comment: serviceLocator.commentSerializer.serialize(comment),
                message: ''
            })
        } catch(err) {
            res.status(500).send({
                exitcode: err.code || 1,
                comment: {},
                message: err.message || err || 'Unknown'
            })
        }        
    },

    async deleteComment(req, res, next) {
        //Content
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const { id } = req.params;

        try {
            //Process
            const comment = await DeleteComment(id, serviceLocator);
        
            //Output
            res.status(200).send({
                exitcode: 0,
                message: ''
            })
        } catch (err) {
            res.status(500).send({
                exitcode: err.code || 1,
                message: err.message || err || 'Unknown'
            })
        }

    },

    async getComment(req, res, next) {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const { id } = req.params;

        try {
            
            //Process
            const comments = await GetComment(id, serviceLocator);

            //Output
            return res.status(200).send({
                exitcode: 0,
                comments: serviceLocator.commentSerializer.serialize(comments),
                message: ''
            })
        } catch(err) {
            res.status(500).send({
                exitcode: err.code || 1,
                comments: {},
                message: err.message || err || 'Unknown'
            })
        }    
    },

    async getAllComments(req, res, next) {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input

        try {
            
            //Process
            const comments = await GetAllComments(serviceLocator);

            console.log(comments);

            //Output
            return res.status(200).send({
                exitcode: 0,
                comments: serviceLocator.commentSerializer.serialize(comments),
                message: ''
            })
        } catch(err) {
            res.status(500).send({
                exitcode: err.code || 1,
                comments: {},
                message: err.message || err || 'Unknown'
            })
        }        
    },

    async getCommentsByContribution(req, res, next) {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const { contributionId } = req.params;

        try {
            
            //Process
            const comments = await GetCommentsByContribution(contributionId, serviceLocator);

            //Output
            return res.status(200).send({
                exitcode: 0,
                comments: serviceLocator.commentSerializer.serialize(comments),
                message: ''
            })
        } catch(err) {
            res.status(500).send({
                exitcode: err.code || 1,
                comments: {},
                message: err.message || err || 'Unknown'
            })
        }        
    }
}