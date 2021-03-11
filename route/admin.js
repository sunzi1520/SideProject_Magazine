/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

module.exports = {
    getHome,
    getAllAccounts,
    getAddAccount,
    addAccount,
    deleteAccount,
    getUpdateAccount
}

var jade = require('jade'); 
var usecase = require('../core/usecase/admin.js');
var path = require('../config/path.js');

function getHome(req, res, next) {
    res.render('admin/home');
}

function getAllAccounts(req, res, next) {
    usecase.getAllAccounts({}, function(result) {
        if (result.exitcode != 0) {
            res.locals = {
                'title': "Something wrong.",
                'message': res.message
            }
        }
        res.locals = {
            'list': result.list
        };
        res.status(200).render('admin/accountList');
    })
}

function getAddAccount(req, res, next) {
    res.render('admin/addAccount');
}

function addAccount(req, res, next) {
    var data = {
        username: req.body.username.toLowerCase().trim(),
        password: req.body.password,
        role: {
            title: req.body.role
        },
        faculty: {
            name: (req.body.role!='Administrator'&&req.body.role!='Manager'?req.body.faculty:'')
        },
        information: {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone
        }
    }

    usecase.addAccount(data, function(result) {
        if (result.exitcode != 0) {
            res.locals = {
                'message' : result.message
            };
            return res.render('admin/addAccount');
        }

        res.locals = {
            'message': 'Created successfully!'
        }
        res.status(200).render('admin/addAccount');
    })
}

function deleteAccount(req, res, next) {
    var data = {
        '_id': req.params.accountId
    }
    if (data._id == req.payload._id) {
        return res.status(200).redirect('/admin/account')
    }
    usecase.deleteAccount(data, function(result) {
        if (result.exitcode != 0) {
            return res.status(500).redirect('/admin/account');
        }
        res.status(200).redirect('/admin/account');
    })
}

function getUpdateAccount(req, res, next) {
    var data = {
        '_id': req.params.accountId
    }

    usecase.getAccountDetails(data, function(result) {
        if (result.exitcode != 0) {
            res.locals = {
                'title': 'Something wrong.',
                'message': result.message
            }
            return res.render('error');
        }
        res.locals = result.details;
        console.log(result);
        res.status(200).render('admin/updateAccount.jade');
    })
}