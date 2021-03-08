/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

module.exports = {
    login
}

function login(data, cb) {
    let exitcode, message;
    if (data.username == 'admin' && data.password == 'admin') {
        exitcode = 0;
        message = '';
    }
    else {
        exitcode = 1;
        message = 'The user does not exist.';
    }
    return cb({exitcode, message});
}