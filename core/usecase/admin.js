'use strict'

module.exports = {
    getAllAccounts,
    deleteAccount,
    addAccount,
    getAccountDetails,
    updateAccount
}

var dataprovider = require('../../dataprovider/admin.js');

function getAllAccounts(data, cb) {
    dataprovider.getAllAccounts(data, function(err, result) {
        if (err) {
            return cb({
                exitcode: 1,
                list: [],
                message: err
            });
        }

        return cb({
            exitcode: 0,
            list: result,
            message: ''
        })
    })
}

function deleteAccount(data, cb) {
    dataprovider.deleteAccount(data, function(err, result) {
        if (err) {
            return cb({
                exitcode: 1,
                message: err
            });
        }

        return cb({
            exitcode: 0,
            message: ''
        })
    })
}

function addAccount(data, cb){
    if (!data.username 
        || !data.password 
        || !data.role.title 
        || !((data.role.title == 'Administrator' || data.role.title == 'Manager') || data.faculty.name)) {
            return cb({
                exitcode: 1,
                message: 'Username, password, role, and faculty (if shown) is required.'
            })
        }
    dataprovider.addAccount(data, function(err, result) {
        if (err) {
            return cb({
                exitcode: 1,
                message: err
            })
        }

        return cb({
            exitcode: 0,
            message: ''
        })
    })
}

function getAccountDetails(data, cb) {
    dataprovider.getAccountDetails(data, function(err, result) {
        if (err) {
            return cb({
                exitcode: 1,
                details: {},
                message: err
            })
        }

        return cb({
            exitcode: 0,
            details: result[0],
            message: err
        })
    })
}