'use strict';

const Message = require('../../domain/models/Message');
const MongooseMessage = require('../orm/mongoose/schemas/Message');
const MessageRepository = require('../../domain/repositories/MessageRepository');
const Mongoose = require('mongoose');

module.exports = class extends MessageRepository {

    async persist(messageEntity) {
        const { sender, receiver, content } = messageEntity;
        const message = new MongooseMessage({ sender, receiver, content });
        await message.save();
        await message.populate('sender', 'id username fullname email').execPopulate();
        await message.populate('receiver', 'id username fullname email').execPopulate();
        return new Message(message.id, message.sender, message.receiver, message.content, message.isRead, message.readAt, message.sentAt);
    }

    async merge(messageEntity) {
        const {id, isRead } = messageEntity;
        const message = await MongooseMessage.findByIdAndUpdate(id, { isRead }, { new: true });
        return new Message(message.id, message.sender, message.receiver, message.content, message.isRead, message.readAt, message.sentAt);
    }

    async remove(messageId) {

    }

    async get(messageId) {

    }

    async find() {

    }

    async getConversation(person1, person2) {
        console.log(person1, ' ', person2)
        const conversation = await MongooseMessage.aggregate([
            {
              '$match': {
                'sender': {
                  '$in': [
                    Mongoose.Types.ObjectId(person1), Mongoose.Types.ObjectId(person2)
                  ]
                }, 
                'receiver': {
                  '$in': [
                    Mongoose.Types.ObjectId(person1), Mongoose.Types.ObjectId(person2)
                  ]
                }
              }
            },
            {
                $sort: {'sentAt': -1}
            },
            {$lookup:
                {
                    from: 'Accounts',
                    let: {'sender': '$sender'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$sender']}}},
                        {$project: {
                            _id: 0,
                            id: '$_id',
                            username: 1,
                            fullname: '$information.fullname',
                            email: '$information.email'
                        }}
                    ],
                    as: 'sender'
                }
            },
            {$unwind: '$sender'},
            {$lookup:
                {
                    from: 'Accounts',
                    let: {'receiver': '$receiver'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$receiver']}}},
                        {$project: {
                            _id: 0,
                            id: '$_id',
                            username: 1,
                            fullname: '$information.fullname',
                            email: '$information.email'
                        }}
                    ],
                    as: 'receiver'
                }
            },
            {$unwind: '$receiver'},
        ]).exec();
        return conversation.map(message => {
            return new Message(message._id, message.sender, message.receiver, message.content, message.isRead, message.readAt, message.sentAt);
        });
    }

}