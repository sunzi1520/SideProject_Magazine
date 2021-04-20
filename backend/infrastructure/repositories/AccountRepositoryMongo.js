'use strict';

const Account = require('../../domain/models/Account');
const MongooseAccount = require('../orm/mongoose/schemas/Account');
const AccountRepository = require('../../domain/repositories/AccountRepository');
const { Mongoose } = require('mongoose');

module.exports = class extends AccountRepository {

  async persist(accountEntity) {
    const {email, password, role, faculty, fullname, gender, dob, phone} = accountEntity;
    const mongooseAccount = new MongooseAccount({email, password, role, faculty, information:{fullname, gender, dob, phone}});
    await mongooseAccount.save();
    if (!mongooseAccount) return null;
    return new Account(mongooseAccount.id, mongooseAccount.email, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information['fullname'], mongooseAccount.information['gender'], mongooseAccount.information['dob'], mongooseAccount.information['phone'], mongooseAccount.createdAt, mongooseAccount.updatedAt);
  }

  async merge(accountEntity) {
    const {id, email, password, role, faculty, 
          fullname, gender, dob, phone} = accountEntity;
    const mongooseAccount = await MongooseAccount.findByIdAndUpdate(id, {$set: {email, password, role, faculty,
                                                                information: {phone, fullname, gender, dob}}}, { new: true });
    return new Account(mongooseAccount.id, mongooseAccount.email, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information['fullname'], mongooseAccount.information['gender'], mongooseAccount.information['dob'], mongooseAccount.information['phone'], mongooseAccount.createdAt, mongooseAccount.updatedAt);
  }

  async remove(accountId) {
    const mongooseAccount = await MongooseAccount.findByIdAndDelete(accountId);
    return new Account(mongooseAccount.id, mongooseAccount.email, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information['fullname'], mongooseAccount.information['gender'], mongooseAccount.information['dob'], mongooseAccount.information['phone'], mongooseAccount.createdAt, mongooseAccount.updatedAt);
  }

  async get(accountId) {
    const mongooseAccount = await MongooseAccount.findById(accountId);
    if (!mongooseAccount) return null;
    return new Account(mongooseAccount.id, mongooseAccount.email, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information['fullname'], mongooseAccount.information['gender'], mongooseAccount.information['dob'], mongooseAccount.information['phone'], mongooseAccount.createdAt, mongooseAccount.updatedAt);
  }

  async getAll() {
    const mongooseAccounts = await MongooseAccount.find();
    return mongooseAccounts.map((mongooseAccount) => {
      return new Account(mongooseAccount.id, mongooseAccount.email, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information['fullname'], mongooseAccount.information['gender'], mongooseAccount.information['dob'], mongooseAccount.information['phone'], mongooseAccount.createdAt, mongooseAccount.updatedAt);
    });
  }

  async getByEmail(email) {
    const mongooseAccount = await MongooseAccount.findOne({email});
    if (!mongooseAccount) return null;
    return new Account(mongooseAccount.id, mongooseAccount.email, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information['fullname'], mongooseAccount.information['gender'], mongooseAccount.information['dob'], mongooseAccount.information['phone'], mongooseAccount.createdAt, mongooseAccount.updatedAt);
  }

  async getByRole(role) {
    const mongooseAccounts = await MongooseAccount.aggregate([
      {$match: { 'role': role }},
    ]).exec();

    return mongooseAccounts.map((mongooseAccount) => {
      return new Account(mongooseAccount._id, mongooseAccount.email, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information['fullname'], mongooseAccount.information['gender'], mongooseAccount.information['dob'], mongooseAccount.information['phone'], mongooseAccount.createdAt, mongooseAccount.updatedAt);
    });
  }

  async getManyByIds(idList) {
    const mongooseAccounts = await MongooseAccount.find({_id: {'$in': idList}});

    return mongooseAccounts.map((mongooseAccount) => {
      return new Account(mongooseAccount._id, mongooseAccount.email, mongooseAccount.password, mongooseAccount.role, mongooseAccount.faculty, mongooseAccount.information['fullname'], mongooseAccount.information['gender'], mongooseAccount.information['dob'], mongooseAccount.information['phone'], mongooseAccount.createdAt, mongooseAccount.updatedAt);
    });
  }
}