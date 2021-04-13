'use strict';

//Use cases
const { ListAccounts, CreateAccount, DeleteAccount, GetAccount, UpdateAccount } = require('../../application/use-cases/AccountUseCases');

async function createFirstAdmin() {
    //Context
    const serviceLocator = require('../../infrastructure/config/server-locator');

    //Input

    try {
        //Process
        const listAccounts = await ListAccounts(serviceLocator);
        
        if (listAccounts.length < 1) {
            const account = await CreateAccount('admin', 'admin', 'admin', 'System Administrator', 'group4.greenwich@gmail.com', serviceLocator);
        
            //Output
            console.log('The first administrator has been created.');
        }
        else {
            console.log('Everything is ready!');
        }
    } catch(err) {
        console.log(err);
    }
}

async function createAccount(req, res, next) {
    try {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const username = req.body.username.trim().toLowerCase();
        const password = req.body.password.trim();
        const {role, faculty, email} = req.body;
        
        //Process
        const account = await CreateAccount(username, password, role, faculty, email, serviceLocator);

        //Output
        if (account) {
            //serviceLocator.mailer.sendMail(email, `Your username is ${account.username}\nYour password is ${password}`, 'Welcome to Magazine Contribution System of the University of Greenwich');
        }

        res.status(200).send({
            exitcode: 0,
            message: ''
        });
    }
    catch (err) {
        console.log('CreateAccount from AccountController: Error: ' + err);
        res.status(500).send({
            exitcode: err.code || 500,
            message: err.message || err || 'Unknown'
        })
    }    
}

async function updateAccount(req, res, next) {
    try {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const {id} = req.params;
        const {username, password, role, faculty, email, phone, fullname, gender, dob} = req.body;
        
        //Process
        const account = await UpdateAccount(id, username, password, role, faculty, fullname, gender, dob, email, phone, serviceLocator);

        //Output
        res.status(200).send({
            exitcode: 0,
            message: ''
        });
    }
    catch (err) {
        console.log('UpdateAccount from AccountController: Error: ' + err);
        res.status(500).send({
            exitcode: err.code || 500,
            message: err.message || err || 'Unknown'
        })
    }    
}

async function deleteAccount(req, res, next) {
    try {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const {id} = req.params;
        
        //Process
        const account = await DeleteAccount(id, serviceLocator);
        
        //Output
        if (account) {
            //serviceLocator.mailer.sendMail(account.email, `Hello ${account.username},\nYour account has been deleted. Contact your manager or administrator if there is a mistake.`, 'Your account is deleted');
        }

        res.status(200).send({
            exitcode: 0,
            message: ''
        });
    }
    catch (err) {
        console.log('DeleteAccount from AccountController: Error: ' + err);
        console.log(err);
        res.status(500).send({
            exitcode: err.code || 500,
            message: err.message || err || 'Unknown'
        })
    }    
}

async function getAccount(req, res, next) {
    try {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const {id} = req.params;
        
        //Process
        const account = await GetAccount(id, serviceLocator);

        //Output
        res.status(200).send({
            exitcode: 0,
            account: serviceLocator.accountSerializer.serialize(account),
            message: ''
        });
    }
    catch (err) {
        console.log('GetAccount from AccountController: Error: ' + err);
        res.status(500).send({
            exitcode: err.code || 500,
            account: {},
            message: err.message || err || 'Unknown'
        })
    }
}

async function listAccounts(req, res, next) {
    try {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        
        //Process
        const accounts = await ListAccounts(serviceLocator);

        //Output
        res.status(200).send({
            exitcode: 0,
            accounts: serviceLocator.accountSerializer.serialize(accounts),
            message: ''
        });
    }
    catch (err) {
        console.log('ListAccounts from AccountController: Error: ' + err);
        res.status(500).send({
            exitcode: err.code || 500,
            accounts: [],
            message: err.message || err || 'Unknown'
        })
    }
}

async function getSelf(req, res, next) {
    try {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const {id} = req.payload;
        
        //Process
        const account = await GetAccount(id, serviceLocator);

        //Output
        res.status(200).send({
            exitcode: 0,
            account: serviceLocator.accountSerializer.serialize(account),
            message: ''
        });
    }
    catch (err) {
        console.log('GetAccount from AccountController: Error: ' + err);
        res.status(500).send({
            exitcode: err.code || 500,
            account: {},
            message: err.message || err || 'Unknown'
        })
    }
}

module.exports = { createFirstAdmin, listAccounts, createAccount, deleteAccount, getAccount, updateAccount, getSelf }