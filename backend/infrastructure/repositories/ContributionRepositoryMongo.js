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
        await mongooseContribution.populate('magazine', '_id name published_year').execPopulate();
        return new Contribution(mongooseContribution.id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
    }

    async merge(contributionEntity) {
        const contributor = contributionEntity.contributor.id;
        const magazine = contributionEntity.magazine.id;
        const {id, title, isSelected} = contributionEntity;
        const mongooseContribution = new MongooseContribution.findByIdAndUpdate(id, {contributor, magazine, title, isSelected});
        await mongooseContribution.populate('contributor', '_id email information.fullname').execPopulate();
        await mongooseContribution.populate('magazine', '_id name published_year').execPopulate();
        return new Contribution(mongooseContribution.id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);

    }

    async remove(contributionId) {
        const mongooseContribution = await MongooseContribution.findByIdAndDelete(contributionId);
        return new Contribution(mongooseContribution.id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
    }

    async get(contributionId) {
        const mongooseContribution = await MongooseContribution.findOne({_id: magazineId});
        if (mongooseContribution) {
            await mongooseContribution.populate('contributor', '_id email role information.fullname').execPopulate();
            await mongooseContribution.populate('magazine', '_id name published_year').execPopulate();
        }
        else {
            return null;
        }
        return new Contribution(mongooseContribution.id, mongooseContribution.contributor, mongooseContribution.magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
    }

    async find() {
        const mongooseContributions = await MongooseContribution.aggregate([
            {$match: {}},
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
                    {$project: {_id: 1, name: 1, published_year: 1}}
                ],
                as: 'magazine'
            }},
            {$unwind: '$magazine'},
        ])
        return mongooseContributions.map((mongooseContribution) => {
            return new Contribution(mongooseContribution.id, mongooseContribution.contributor, mongooseContribution.magazine,
                                    mongooseContribution.title, mongooseContribution.isSelected,
                                    mongooseContribution.createdAt, mongooseContribution.updatedAt);
        });

    }

}