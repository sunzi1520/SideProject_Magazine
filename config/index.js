/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

const CONFIG_TYPE = 1;

switch (CONFIG_TYPE) {
    case 0:
        exports.server = {
            port: process.env.PORT || 3000,
            noTokenUrls: ['/account/login']
        };

        exports.security = {
            secret: 'GROUP-4-web@enterprise//secret',
            expTime: {
                normal:     60 * 60 * 2, //2 hours
                remembered: 60 * 60 * 24 * 365 // 365 days
            } 
        };
        
        exports.database = {
            host: 'localhost',
            port: 27017,
            name: 'magazine',
            username: '',
            password: '',
            optional: ''
        };
        break;
    case 1:
        exports.server = {
            port: process.env.PORT || 3000,
            noTokenUrls: ['/account/login']
        };

        exports.security = {
            secret: 'GROUP-4-web@enterprise//secret',
            expTime: {
                normal:     60 * 60 * 2, //2 hours
                remembered: 60 * 60 * 24 * 365 // 365 days
            } 
        };
        
        exports.database = {
            host: 'mcms0.nbhpk.mongodb.net',
            port: 27017,
            name: 'magazine',
            username: 'dbAdmin',
            password: 'Dd6z8SYbkMYxbkWv',
            optional: '?retryWrites=true&w=majority'
        };
        break;
    default:
        break;
}