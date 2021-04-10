'use strict';

//Use cases
const { SendMessage, GetConversation } = require('../../application/use-cases/MessageUseCases');

module.exports = {
    
    async sendMessage(req, res, next) {
        //Content
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const sender = req.payload.id;
        const receiver = req.params.receiverId;
        const content = req.body.content;

        try {
            //Process
            const message = await SendMessage(sender, receiver, content, serviceLocator);
            
            //Output
            console.log(message);
            if (message && message.id) {
                return res.status(200).send({
                    exitcode: 0,
                    message: ''
                })
            }
            else {
                throw new Error('MESSAGE_NOT_SENT');
            }
        } catch(err) {
            res.status(500).send({
                exitcode: err.code || 1,
                message: err.message || err || 'Unknown'
            })
        }
    },

    async getConversation(req, res, next) {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const person1 = req.payload.id;
        const person2 = req.params.contactId;

        try {
            //Process
            const conversation = await GetConversation(person1, person2, serviceLocator);

            //Output
            res.status(200).send({
                exitcode: 0,
                conversation,
                message: ''
            })
        } catch(err) {
            res.status(500).send({
                exitcode: err.code || 1,
                conservation: [],
                message: err.message || err || 'Unknown'
            })
        }
    }
}