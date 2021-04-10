'use strict'

const constants = require('./constants');

module.exports = (() => {
    const enviroment = {
        server: {
            port: process.env.PORT || 3000
        },
        database: {
            dialect: process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.MONGO.DIALECT,
            uri: process.env.DATABASE_URI ||  constants.SUPPORTED_DATABASE.MONGO.URI
        }
    };

    return enviroment;
})()
