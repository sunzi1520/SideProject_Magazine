'use strict';

const Account = require('../../domain/models/Account');
const MongooseAccount = require('../orm/mongoose/schemas/Account');
const AccountRepository = require('../../domain/repositories/AccountRepository');
const { Mongoose } = require('mongoose');

module.exports = class extends AccountRepository {

  async persist(accountEntity) {
    const {username, password, role, faculty, email} = accountEntity;
    const mongooseAccount = new MongooseAccount({username, password, role, faculty, information: {email}});
    await mongooseAccount.save();
    return new Account(mongooseAccount.id, mongooseAccount.username,  mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information.email);
  }

  async mergeInformation(accountEntity) {
    const {id, username, password, role, faculty, 
          email, phone, fullname, gender, dob} = accountEntity;
    const mongooseAccount = await MongooseAccount.findByIdAndUpdate({_id: id}, {$set: {username, password, role, faculty,
                                                                information: {email, phone, fullname, gender, dob}}}, { new: true });
    return new Account(mongooseAccount._id, mongooseAccount.username, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty,
      mongooseAccount.information.email, mongooseAccount.information.phone, mongooseAccount.information.fullname, mongooseAccount.information.gender, mongooseAccount.information.dob, 
      mongooseAccount.isActive || false , mongooseAccount.lastAccess, 
      mongooseAccount.createdAt, mongooseAccount.updatedAt);
  }

  async remove(accountId) {
    const mongooseAccount = await MongooseAccount.findByIdAndDelete(accountId);
    return new Account(mongooseAccount._id, mongooseAccount.username, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information.email, mongooseAccount.information.phone, mongooseAccount.information.fullname, mongooseAccount.information.gender, mongooseAccount.information.dob);
  }

  async get(accountId) {
    const mongooseAccount = await MongooseAccount.findById(accountId);
    return new Account(mongooseAccount._id, mongooseAccount.username, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty,
                        mongooseAccount.information.email, mongooseAccount.information.phone, mongooseAccount.information.fullname, mongooseAccount.information.gender, mongooseAccount.information.dob, 
                        mongooseAccount.isActive || false, mongooseAccount.lastAccess, 
                        mongooseAccount.createdAt, mongooseAccount.updatedAt);
  }

  async getByUsername(username) {
    const mongooseAccount = await MongooseAccount.findOne({username});
    return new Account(mongooseAccount._id, mongooseAccount.username, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty,
                        mongooseAccount.information.email, mongooseAccount.information.phone, mongooseAccount.information.fullname, mongooseAccount.information.gender, mongooseAccount.information.dob, 
                        mongooseAccount.isActive || false, mongooseAccount.lastAccess, 
                        mongooseAccount.createdAt, mongooseAccount.updatedAt);
  }

  async find() {
    const mongooseAccounts = await MongooseAccount.find();
    return mongooseAccounts.map((mongooseAccount) => {
      return new Account(mongooseAccount._id, mongooseAccount.username, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty,
                         mongooseAccount.information.email, mongooseAccount.information.phone, mongooseAccount.information.fullname, mongooseAccount.information.gender, mongooseAccount.information.dob, 
                         mongooseAccount.isActive || false, mongooseAccount.lastAccess, 
                         mongooseAccount.createdAt, mongooseAccount.updatedAt);
    });
  }

  async findByRole(role) {
    const mongooseAccounts = await MongooseAccount.aggregate([
      {$match: { 'role': role }},
    ]).exec();

    return mongooseAccounts.map((mongooseAccount) => {
      return new Account(mongooseAccount._id, mongooseAccount.username, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty,
                         mongooseAccount.information.email, mongooseAccount.information.phone, mongooseAccount.information.fullname, mongooseAccount.information.gender, mongooseAccount.information.dob, 
                         mongooseAccount.isActive || false, mongooseAccount.lastAccess, 
                         mongooseAccount.createdAt, mongooseAccount.updatedAt);
    });
  }
}