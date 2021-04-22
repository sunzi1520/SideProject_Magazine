'use strict';

const mongoose = require('mongoose');

const Comment = require('../../domain/models/Comment');
const MongooseComment = require('../orm/mongoose/schemas/Comment');
const CommentRepository = require('../../domain/repositories/CommentRepository');
const Account = require('../../domain/models/Account');
const Contribution = require('../../domain/models/Contribution');

module.exports = class extends CommentRepository {

    async persist(commentEntity) {
        const { createdBy, contribution, content } = commentEntity;
        const mongooseComment = new MongooseComment({createdBy, contribution, content});
        await mongooseComment.save();
        await mongooseComment.populate('createdBy').execPopulate();
        await mongooseComment.populate('contribution').execPopulate();
        const refCreator = new Account(mongooseComment.createdBy.id, mongooseComment.createdBy.email, mongooseComment.createdBy.password, mongooseComment.createdBy.role, mongooseComment.createdBy.faculty, mongooseComment.createdBy.information.fullname, mongooseComment.createdBy.information.gender, mongooseComment.createdBy.information.dob, mongooseComment.createdBy.phone, mongooseComment.createdBy.createdAt, mongooseComment.createdBy.updatedAt);
        const refContribution = new Contribution(mongooseComment.contribution.id, mongooseComment.contribution.magazine, mongooseComment.contribution.title, mongooseComment.contribution.isSelected, mongooseComment.contribution.createdAt, mongooseComment.contribution.updatedAt);
        return new Comment(mongooseComment.id, refCreator, mongooseComment.content, refContribution, mongooseComment.createdAt, mongooseComment.updatedAt);
    }

    async merge(commentEntity) {
        const createdBy = commentEntity.createdBy.id;
        const contribution = commentEntity.contribution.id;
        const { id, content } = commentEntity;
        const mongooseComment = await MongooseComment.findByIdAndUpdate(id, {createdBy, contribution, content}, {new:true});
        await mongooseComment.populate('createdBy').execPopulate();
        await mongooseComment.populate('contribution').execPopulate();
        const refCreator = new Account(mongooseComment.createdBy.id, mongooseComment.createdBy.email, mongooseComment.createdBy.password, mongooseComment.createdBy.role, mongooseComment.createdBy.faculty, mongooseComment.createdBy.information.fullname, mongooseComment.createdBy.information.gender, mongooseComment.createdBy.information.dob, mongooseComment.createdBy.phone, mongooseComment.createdBy.createdAt, mongooseComment.createdBy.updatedAt);
        const refContribution = new Contribution(mongooseComment.contribution.id, mongooseComment.contribution.magazine, mongooseComment.contribution.title, mongooseComment.contribution.isSelected, mongooseComment.contribution.createdAt, mongooseComment.contribution.updatedAt);
        return new Comment(mongooseComment.id, refCreator, mongooseComment.content, refContribution, mongooseComment.createdAt, mongooseComment.updatedAt);
    }

    async remove(commentId) {
        const mongooseComment = await MongooseComment.findByIdAndDelete(commentId);
        await mongooseComment.populate('createdBy').execPopulate();
        await mongooseComment.populate('contribution').execPopulate();
        const refCreator = new Account(mongooseComment.createdBy.id, mongooseComment.createdBy.email, mongooseComment.createdBy.password, mongooseComment.createdBy.role, mongooseComment.createdBy.faculty, mongooseComment.createdBy.information.fullname, mongooseComment.createdBy.information.gender, mongooseComment.createdBy.information.dob, mongooseComment.createdBy.phone, mongooseComment.createdBy.createdAt, mongooseComment.createdBy.updatedAt);
        const refContribution = new Contribution(mongooseComment.contribution.id, mongooseComment.contribution.magazine, mongooseComment.contribution.title, mongooseComment.contribution.isSelected, mongooseComment.contribution.createdAt, mongooseComment.contribution.updatedAt);
        return new Comment(mongooseComment.id, refCreator, mongooseComment.content, refContribution, mongooseComment.createdAt, mongooseComment.updatedAt);
    }

    async get(commentId) {
        const mongooseComment = await MongooseComment.findById(commentId);
        await mongooseComment.populate('createdBy').execPopulate();
        await mongooseComment.populate('contribution').execPopulate();
        const refCreator = new Account(mongooseComment.createdBy.id, mongooseComment.createdBy.email, mongooseComment.createdBy.password, mongooseComment.createdBy.role, mongooseComment.createdBy.faculty, mongooseComment.createdBy.information.fullname, mongooseComment.createdBy.information.gender, mongooseComment.createdBy.information.dob, mongooseComment.createdBy.phone, mongooseComment.createdBy.createdAt, mongooseComment.createdBy.updatedAt);
        const refContribution = new Contribution(mongooseComment.contribution.id, mongooseComment.contribution.magazine, mongooseComment.contribution.title, mongooseComment.contribution.isSelected, mongooseComment.contribution.createdAt, mongooseComment.contribution.updatedAt);
        return new Comment(mongooseComment.id, refCreator, mongooseComment.content, refContribution, mongooseComment.createdAt, mongooseComment.updatedAt);
    }

    async find(query) {
        await Object.keys(query['pre']).forEach(x => query['pre'][x] === undefined && delete query['pre'][x]);
        await Object.keys(query['post']).forEach(x => query['post'][x] === undefined && delete query['post'][x]);
        console.log(query);
        const mongooseComments = await MongooseComment.aggregate([
            {'$match': query['pre']},
            {'$lookup': {
                'from': 'Accounts',
                'localField': 'createdBy',
                'foreignField': '_id',
                'as': 'createdBy'
            }},
            {'$unwind': {
                'path': '$createdBy',
                'preserveNullAndEmptyArrays': true
            }},
            {'$lookup': {
                'from': 'Contributions',
                'localField': 'contribution',
                'foreignField': '_id',
                'as': 'contribution'
            }},
            {'$unwind': {
                'path': '$contribution',
                'preserveNullAndEmptyArrays': true
            }},
            {'$match': query['post']},
        ]).exec()
        return mongooseComments.map(mongooseComment => {
            const refCreator = new Account(mongooseComment.createdBy._id, mongooseComment.createdBy.email, mongooseComment.createdBy.password, mongooseComment.createdBy.role, mongooseComment.createdBy.faculty, mongooseComment.createdBy.information.fullname, mongooseComment.createdBy.information.gender, mongooseComment.createdBy.information.dob, mongooseComment.createdBy.phone, mongooseComment.createdBy.createdAt, mongooseComment.createdBy.updatedAt);
            const refContribution = new Contribution(mongooseComment.contribution._id, mongooseComment.contribution.magazine, mongooseComment.contribution.title, mongooseComment.contribution.isSelected, mongooseComment.contribution.createdAt, mongooseComment.contribution.updatedAt);
            return new Comment(mongooseComment._id, refCreator, mongooseComment.content, refContribution, mongooseComment.createdAt, mongooseComment.updatedAt);
        })
    }

    async getWithFilter({id, accountId, contributionId, faculty}) {
        return this.find({
            'pre': {
                '_id': id && mongoose.Types.ObjectId(id),
                'createdBy': accountId && mongoose.Types.ObjectId(accountId),
                'contribution': contributionId && mongoose.Types.ObjectId(contributionId)
            },
            'post': {
                'createdBy.faculty': faculty
            }
        })
    } 

    getByContribution(contributionId) {
        return this.getWithFilter({'contributionId': contributionId});
    }

    getAll() {
        return this.getWithFilter({});
    }

}