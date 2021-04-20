'use strict';

const Contribution = require('../../domain/models/Contribution');
const MongooseContribution = require('../orm/mongoose/schemas/Contribution');
const ContributionRepository = require('../../domain/repositories/ContributionRepository');

module.exports = class extends ContributionRepository {

    async persist(contributionEntity) {
        const contributor = contributionEntity.contributor.id;
        const magazine = contributionEntity.magazine.id;
        const {title, isSelected} = contributionEntity;
        const mongooseContribution = new MongooseContribution({contributor, magazine, title, isSelected});
        await mongooseContribution.save();
        await mongooseContribution.populate('contributor', '_id email information.fullname').execPopulate();
        await mongooseContribution.populate('magazine', '_id name published_year closureDate finalClosureDate').execPopulate();
        return new Contribution(mongooseContribution.id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
    }

    async merge(contributionEntity) {
        const contributor = contributionEntity.contributor.id;
        const magazine = contributionEntity.magazine.id;
        const {id, title, isSelected} = contributionEntity;
        const mongooseContribution = await MongooseContribution.findByIdAndUpdate(id, {contributor, magazine, title, isSelected}, {new: true});
        await mongooseContribution.populate('contributor', '_id email information.fullname').execPopulate();
        await mongooseContribution.populate('magazine', '_id name published_year closureDate finalClosureDate').execPopulate();
        return new Contribution(mongooseContribution.id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
    }

    async remove(contributionId) {
        const mongooseContribution = await MongooseContribution.findByIdAndDelete(contributionId);
        return new Contribution(mongooseContribution.id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
    }

    async get(contributionId) {
        const mongooseContribution = await MongooseContribution.findById(contributionId);
        if (mongooseContribution) {
            await mongooseContribution.populate('contributor', '_id email role information.fullname').execPopulate();
            await mongooseContribution.populate('magazine', '_id name published_year closureDate finalClosureDate').execPopulate();
        }
        else {
            return null;
        }
        return new Contribution(mongooseContribution.id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
    }

    async getByFaculty(contributorFaculty) {
        console.log(contributorFaculty)
        const mongooseContributions = await MongooseContribution.aggregate([
            {'$lookup': {
                'from': 'Accounts',
                'localField': 'contributor',
                'foreignField': '_id',
                'as': 'contributor'
            }},
            {'$unwind': {
                'path': '$contributor',
                'preserveNullAndEmptyArrays': true
            }},
            {'$lookup': {
                'from': 'Magazines',
                'localField': 'magazine',
                'foreignField': '_id',
                'as': 'magazine'
            }},
            {'$unwind': {'path': '$magazine', 'preserveNullAndEmptyArrays': true}},
            {'$match': {$expr: {$eq: [contributorFaculty, '$contributor.faculty']}}}
        ]).exec();
        
        return mongooseContributions.map((mongooseContribution) => {
            return new Contribution(mongooseContribution._id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
        });
        
    }

    async getByAccount(accountId) {
        return this.find({'contributor': accountId});
    }

    async getAll() {
        return this.find({});
    }

    async find(query) {
        const mongooseContributions = await MongooseContribution.aggregate([
            {$match: query},
            {$lookup: {
                from: 'Accounts',
                let: {contributor_id: '$contributor'},
                pipeline: [
                    {$match: {$expr: {$eq: ['$_id', '$$contributor_id']}}},
                    {$project: {_id: 1, email: 1, role: 1, 'information.fullname': 1}}
                ],
                as: 'contributor'
            }},
            {$unwind: '$contributor'},
            {$lookup: {
                from: 'Magzines',
                let: {magazine_id: '$magazine'},
                pipeline: [
                    {$match: {$expr: {$eq: ['$_id', '$$magazine_id']}}},
                    {$project: {_id: 1, name: 1, published_year: 1,  closureDate: 1, finalClosureDate: 1}}
                ],
                as: 'magazine'
            }},
            {$unwind: '$magazine'},
        ])
        return mongooseContributions.map((mongooseContribution) => {
            return new Contribution(mongooseContribution._id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
        });
    }

}