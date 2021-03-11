/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

module.exports = {
    login
}

var config = require('../../config'), 
    JWT = require('../../lib/JWT.js');
var dataprovider = require('../../dataprovider/account.js');

function login(data, cb) {
    dataprovider.login(data, function(err, result) {
        if (err) {
            return cb({exitcode: 1, role: null, token: {}, message: err});
        }

        if (result) {
            return cb({exitcode: 0, role: result.role, token: JWT.Encode(result.toJSON(), config.security.expTime.normal), message: ''});
        }
        else {
            return cb({exitcode: 101, role: null, user: {}, message: 'The user does not exist.'})
        }
    })
}