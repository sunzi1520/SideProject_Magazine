'use strict';

const Message = require('../../domain/models/Message');

module.exports = {
    
    SendMessage(sender, receiver, content, { messageRepository }) {
        const message = new Message(null, sender, receiver, content);
        return messageRepository.persist(message);
    },

    async GetConversation(person1, person2, { messageRepository }) {
        const conversation = await messageRepository.getConversation(person1, person2);
        console.log(conversation);
        await conversation.forEach(message => {
            console.log(JSON.stringify(message, 2), ' ', person1);
            if (!message.isRead && message.receiver.id == person1) {
                message.isRead = true;
                message.readAt = (new Date()).toISOString();
                messageRepository.merge(message);
            }
        })
        return conversation;
    }

}