/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

module.exports = {
    getLogin,
    login,
    logout
}

var jade = require('jade'); 
var usecase = require('../core/usecase/account.js');
var path = require('../config/path.js');

function getLogin(req, res, next) {
    res.render('login');
}

function login(req, res, next) {
    var data = {
        username: req.body.username.toLowerCase().trim(),
        password: req.body.password
    }

    usecase.login(data, function(result) {
        if (result.exitcode != 0) {
            return res.render('login', {error: result});
        }
        res.cookie('x-access-token', result.token)
        res.redirect(path[result.role]);
    })
}

function logout(req, res, next) {
    res.clearCookie('x-access-token');
    res.redirect('/');
}