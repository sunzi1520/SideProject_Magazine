/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

module.exports = {
    getLogin,
    login
}

var jade = require('jade'); 
var usecase = require('../core/usecase/account.js');

function getLogin(req, res, next) {
    res.render('login');
}

function login(req, res, next) {
    var data = {
        username: req.body.username.toLowerCase().trim(),
        password: req.body.password
    }

    usecase.login(data, function(result) {
        if (result.exitcode == 1) {
            return res.render('login', {error: result});
        }
        res.render('login', {success: result})
    })
}