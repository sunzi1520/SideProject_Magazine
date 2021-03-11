/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

module.exports = {
    assignRoutes
}

var account = require('./account.js'),
    admin = require('./admin.js');

function assignRoutes(app) {
    app.get('/account/login', account.getLogin);
    app.post('/account/login', account.login);
    app.get('/account/logout', account.logout);

    app.get('/admin', admin.getHome);
    app.get('/admin/account', admin.getAllAccounts);
    app.get('/admin/add/account', admin.getAddAccount);
    app.post('/admin/add/account', admin.addAccount);
    app.get('/admin/delete/account/:accountId', admin.deleteAccount);
    app.get('/admin/update/account/:accountId', admin.getUpdateAccount);

}