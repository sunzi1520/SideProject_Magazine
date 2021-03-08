/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

module.exports = {
    assignRoutes
}

var account = require('./account.js');

function assignRoutes(app) {
    app.get('/account/login', account.getLogin);
    app.post('/account/login', account.login)
}