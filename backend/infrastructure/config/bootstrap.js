'use strict';

const constants = require('./constants');
const environment = require('./environment');

module.exports = {
  
  async init() {
    const bootstrap = {};

    if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO.DIALECT) {
      bootstrap.orm = require('../orm/mongoose/mongoose');
    }
    else {
        throw new Error('NO DATABASE CONFIGURED')
    }

    return bootstrap;
  }
};
