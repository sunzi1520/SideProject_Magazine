/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

const config = require('../config');

module.exports = {
  login
}

var MongooseConnect = require('../lib/MongoConnect.js'),
    Entity = require('../core/entity');

function login(data, cb) {
  MongooseConnect.Connect(config.database.name)
    .then(db => {
      Entity.accountEntity.findOne(data,
        {
          '_id': 1,
          'username': 1,
          'role': '$role.title'
        }, 
        cb);
    })
    .catch(err => {
      console.log('account_dataprovider_login ' + err);
      cb(err, {});
    })
}