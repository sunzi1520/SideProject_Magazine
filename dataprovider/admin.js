/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

const config = require('../config');

module.exports = {
  getAllAccounts,
  deleteAccount,
  addAccount,
  getAccountDetails
}

var MongooseConnect = require('../lib/MongoConnect.js'),
    Entity = require('../core/entity');

function getAllAccounts(data, cb) {
  MongooseConnect.Connect(config.database.name)
    .then(db => {
      Entity.accountEntity.aggregate([
          {'$match': data},
          {'$project': {
              '_id': 1,
              'username': 1,
              'role': '$role.title',
              'name': { '$concat': ['$information.firstname', ' ', '$information.middlename', ' ', '$information.lastname']}
          }}
      ], 
        cb);
    })
    .catch(err => {
      console.log('admin_dataprovider_getAllAccount ' + err);
      cb(err, {});
    })
}

function deleteAccount(data, cb) {
  MongooseConnect.Connect(config.database.name)
    .then(db => {
      Entity.accountEntity.find({}, (err, result) => {
        if (err) {
          return cb(err, result);
        }

        if (result.length <= 1) {
          return cb('Cannot delete the only account', {});
        }
        else {
          Entity.accountEntity.deleteOne(data, cb);
        }
      });
    })
    .catch(err => {
      console.log('admin_dataprovider_deleteAccount ' + err);
      cb(err, {});
    })
}

function addAccount(data, cb) {
  MongooseConnect.Connect(config.database.name)
    .then(db => {
      Entity.accountEntity.find({'username': data.username}, (err, result) => {
        if (err) {
          return cb(err, result);
        }

        if (result.length >= 1) {
          return cb('Username is duplicated', {});
        }
        else {
          Entity.accountEntity.create(data, cb);
        }
      });
    })
    .catch(err => {
      console.log('admin_dataprovider_addAccount ' + err);
      cb(err, {});
    })
}

function getAccountDetails(data, cb) {
  MongooseConnect.Connect(config.database.name)
    .then(db => {
      Entity.accountEntity.aggregate([
        {'$match': {'_id': MongooseConnect.ToObjectId(data._id)}},
        {'$project': {
          '_id': 0,
          'id': '$_id',
          'username': 1,
          'role': '$role.title',
          'faculty': '$faculty.name',
          'firstname': '$information.firstname',
          'middlename': '$information.middlename',
          'lastname': '$information.lastname',
          'email': '$information.email',
          'phone': '$informaion.phone'
        }}
      ], cb);
    })
    .catch(err => {
      console.log('admin_dataprovider_getAccountDetails ' + err);
      cb(err, {});
    })
}