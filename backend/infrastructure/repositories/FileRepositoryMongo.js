'use strict';

const File = require('../../domain/models/File');
const MongooseFile = require('../orm/mongoose/schemas/File');
const FileRepository = require('../../domain/repositories/FileRepository');

module.exports = class extends FileRepository {

    async persist(fileEntity) {
        const contribution = fileEntity.contribution.id;
        const { filename, path, filetype } = fileEntity;
        const mongooseFile = new MongooseFile({ contribution, filename, path, filetype });
        await mongooseFile.save();
        return new File(mongooseFile.id, mongooseFile.filename, mongooseFile.contribution, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
      }
    
    async merge(fileEntity) {
        const { id, filename, contributionId, path, uploadedAt, updatedAt } = fileEntity;
        const mongooseFile = await MongooseFile.findByIdAndUpdate(id, { filename, contributionId, path, uploadedAt, updatedAt });
        return new File(mongooseFile.id, mongooseFile.contributionId, mongooseFile.filename, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
    }
    
    
    async remove(fileId) {
        return MongooseFile.findByIdAndDelete(fileId);  
    }

    async get(fileId) {
        const mongooseFile = await MongooseFile.findById(fileId);
        return new File(mongooseFile.id, mongooseFile.contributionId, mongooseFile.filename, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
    }
    
    async getByName(filename) {
        const mongooseFile = await MongooseFile.findOne({filename});
        return new File(mongooseFile.id, mongooseFile.contributionId, mongooseFile.filename, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
    }
    
    async find() {
        const mongooseUsers = await MongooseFile.find();
        return mongooseUsers.map((mongooseFile) => {
            return new File(mongooseFile.id, mongooseFile.contributionId, mongooseFile.filename, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
        });
    }

}