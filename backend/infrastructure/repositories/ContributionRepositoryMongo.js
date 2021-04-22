'use strict';

const Contribution = require('../../domain/models/Contribution');
const MongooseContribution = require('../orm/mongoose/schemas/Contribution');
const ContributionRepository = require('../../domain/repositories/ContributionRepository');
const Account = require('../../domain/models/Account');
const Magazine = require('../../domain/models/Magazine');
const mongoose = require('mongoose');


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
        const contributor = contributionEntity.contributor.id || contributionEntity.contributor;
        const magazine = contributionEntity.magazine.id || contributionEntity.magazine;
        const {id, title, isSelected} = contributionEntity;
        const mongooseContribution = await MongooseContribution.findByIdAndUpdate(id, {contributor, magazine, title, isSelected}, {new: true});
        await mongooseContribution.populate('contributor', '_id email information.fullname').execPopulate();
        await mongooseContribution.populate('magazine', '_id name published_year closureDate finalClosureDate').execPopulate();
        const newContributor = new Account(mongooseContribution.contributor._id.toString(), mongooseContribution.contributor.email, mongooseContribution.contributor.password, mongooseContribution.contributor.role, mongooseContribution.contributor.faculty, mongooseContribution.contributor.information.fullname, mongooseContribution.contributor.gender, mongooseContribution.contributor.dob, mongooseContribution.contributor.phone, mongooseContribution.contributor.createdAt, mongooseContribution.contributor.updatedAt);
        const newMagazine = new Magazine(mongooseContribution.magazine._id.toString(), mongooseContribution.magazine.manager, mongooseContribution.magazine.name, mongooseContribution.magazine.closureDate, mongooseContribution.magazine.finalClosureDate, mongooseContribution.magazine.coordinators, mongooseContribution.magazine.published_year, mongooseContribution.magazine.isLocked, mongooseContribution.magazine.createdAt, mongooseContribution.magazine.updatedAt);
        return new Contribution(mongooseContribution.id, newContributor, newMagazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
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
        const contributor = new Account(mongooseContribution.contributor._id.toString(), mongooseContribution.contributor.email, mongooseContribution.contributor.password, mongooseContribution.contributor.role, mongooseContribution.contributor.faculty, mongooseContribution.contributor.information.fullname, mongooseContribution.contributor.gender, mongooseContribution.contributor.dob, mongooseContribution.contributor.phone, mongooseContribution.contributor.createdAt, mongooseContribution.contributor.updatedAt);
        const magazine = new Magazine(mongooseContribution.magazine._id.toString(), mongooseContribution.magazine.manager, mongooseContribution.magazine.name, mongooseContribution.magazine.closureDate, mongooseContribution.magazine.finalClosureDate, mongooseContribution.magazine.coordinators, mongooseContribution.magazine.published_year, mongooseContribution.magazine.isLocked, mongooseContribution.magazine.createdAt, mongooseContribution.magazine.updatedAt);
        return new Contribution(mongooseContribution.id, contributor, magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
    }

    async getByFaculty(contributorFaculty) {
        return this.getWithFilter({'contributor.faculty': contributorFaculty});       
    }

    async getByAccount(accountId) {
        return this.getWithFilter({'contributorId': mongoose.Types.ObjectId(accountId)});
    }

    async getByBeingSelected() {
        return this.getWithFilter({'isSelected': true});
    }

    async getAll() {
        return this.find({});
    }

    async getWithFilter({id, contributorId, magazineId, title, isSelected, faculty}) {
        return this.find({'pre': {
            '_id': id && mongoose.Types.ObjectId(id),
            'contributor': contributorId && mongoose.Types.ObjectId(contributorId),
            'magazine': magazineId && mongoose.Types.ObjectId(magazineId),
            'title': title,
            'isSelected': isSelected
        }, 
        'post': {'contributor.faculty': faculty}})
    }

    async find(query) {
        await Object.keys(query['pre']).forEach(x => query['pre'][x] === undefined && delete query['pre'][x]);
        await Object.keys(query['post']).forEach(x => query['post'][x] === undefined && delete query['post'][x]);
        const mongooseContributions = await MongooseContribution.aggregate([
            {'$match': query['pre']},
            {'$lookup': {
                'from': 'Accounts',
                'let': {'contributor_id': '$contributor'},
                'pipeline': [
                    {'$match': {'$expr': {'$eq': ['$_id', '$$contributor_id']}}}
                ],
                'as': 'contributor'
            }},
            {'$unwind': {
                'path': '$contributor',
                'preserveNullAndEmptyArrays': true
            }},
            {'$lookup': {
                'from': 'Magazines',
                'let': {'magazine_id': '$magazine'},
                'pipeline': [
                    {'$match': {'$expr': {'$eq': ['$_id', '$$magazine_id']}}}
                ],
                'as': 'magazine'
            }},
            {'$unwind': {
                'path': '$magazine',
                'preserveNullAndEmptyArrays': true
            }},
            {'$match': query['post']}
        ]).exec();
        return mongooseContributions.map((mongooseContribution) => {
            const contributor = new Account(mongooseContribution.contributor._id.toString(), mongooseContribution.contributor.email, mongooseContribution.contributor.password, mongooseContribution.contributor.role, mongooseContribution.contributor.faculty, mongooseContribution.contributor.information.fullname, mongooseContribution.contributor.gender, mongooseContribution.contributor.dob, mongooseContribution.contributor.phone, mongooseContribution.contributor.createdAt, mongooseContribution.contributor.updatedAt);
            const magazine = new Magazine(mongooseContribution.magazine._id.toString(), mongooseContribution.magazine.manager, mongooseContribution.magazine.name, mongooseContribution.magazine.closureDate, mongooseContribution.magazine.finalClosureDate, mongooseContribution.magazine.coordinators, mongooseContribution.magazine.published_year, mongooseContribution.magazine.isLocked, mongooseContribution.magazine.createdAt, mongooseContribution.magazine.updatedAt);
            return new Contribution(mongooseContribution._id, contributor, magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
        });
    }
}