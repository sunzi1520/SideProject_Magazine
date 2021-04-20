'use strict';

const File = require('../../domain/models/File');
const MongooseFile = require('../orm/mongoose/schemas/File');
const FileRepository = require('../../domain/repositories/FileRepository');
const Contribution = require('../../domain/models/Contribution');
const mongoose = require('mongoose');

module.exports = class extends FileRepository {

    async persist(fileEntity) {
        const contribution = fileEntity.contribution.id;
        const { filename, path, filetype } = fileEntity;
        const mongooseFile = new MongooseFile({ contribution, filename, path, filetype });
        await mongooseFile.save();
        await mongooseFile.populate('contribution').execPopulate();
        return new File(mongooseFile.id, mongooseFile.filename, fileEntity.contribution, mongooseFile.path, mongooseFile.filetype, mongooseFile.createdAt);
      }
    
    async merge(fileEntity) {
        const { id, filename, contributionId, path, uploadedAt, updatedAt } = fileEntity;
        const mongooseFile = await MongooseFile.findByIdAndUpdate(id, { filename, contributionId, path, uploadedAt, updatedAt });
        await mongooseFile.populate('contribution').execPopulate();
        return new File(mongooseFile.id, mongooseFile.filename, mongooseFile.contribution, mongooseFile.path, mongooseFile.filetype, mongooseFile.createdAt);
    }
    
    
    async remove(fileId) {
        const mongooseFile = await MongooseFile.findByIdAndDelete(fileId);
        await mongooseFile.populate('contribution').execPopulate();  
        return new File(mongooseFile.id, mongooseFile.filename, mongooseFile.contribution, mongooseFile.path, mongooseFile.filetype, mongooseFile.createdAt);
    }

    async get(fileId) {
        const mongooseFile = await MongooseFile.findById(fileId);
        await mongooseFile.populate('contribution').execPopulate();
        return new File(mongooseFile.id, mongooseFile.filename, mongooseFile.contribution, mongooseFile.path, mongooseFile.filetype, mongooseFile.createdAt);
    }
    
    async getByName(filename) {
        const mongooseFile = await MongooseFile.findOne({filename});
        await mongooseFile.populate('contribution').execPopulate();
        return new File(mongooseFile.id, mongooseFile.filename, mongooseFile.contribution, mongooseFile.path, mongooseFile.filetype, mongooseFile.createdAt);
    }

    async getByContribution(contributionId) {
        const mongooseFiles = await MongooseFile.aggregate([
            {'$match': {'contribution': mongoose.Types.ObjectId(contributionId)}},
            {'$lookup': {
                'from': 'Contributions',
                'localField': 'contribution',
                'foreignField': '_id',
                'as': 'contribution'
            }},
            {'$unwind': {
                'path': '$contribution',
                'preserveNullAndEmptyArrays': true
            }}
        ]).exec();
        return mongooseFiles.map((mongooseFile) => {
            const contribution = new Contribution(mongooseFile.contribution._id, mongooseFile.contribution.contributor, mongooseFile.contribution.magazine, mongooseFile.contribution.title, mongooseFile.contribution.isSeleted, mongooseFile.contribution.createdAt, mongooseFile.contribution.updatedAt);
            return new File(mongooseFile._id, mongooseFile.filename, contribution, mongooseFile.path, mongooseFile.filetype, mongooseFile.createdAt);
        });
    }
    
    async find() {
        const mongooseFiles = await MongooseFile.find();
        await mongooseFiles.populate('contribution').execPopulate();
        return mongooseFiles.map((mongooseFile) => {
            const contribution = new Contribution(contribution.id, contribution.contributor, contribution.magazine, contribution.title, contribution.isSeleted, ontribution.createdAt, ontribution.updatedAt);
            return new File(mongooseFile._id, mongooseFile.filename, contribution, mongooseFile.path, mongooseFile.filetype, mongooseFile.createdAt);
        });
    }

}