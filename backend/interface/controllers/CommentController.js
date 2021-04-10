'use strict';

const { DeleteComment } = require('../../application/use-cases/CommentUseCases');

module.exports = {
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

    }
}