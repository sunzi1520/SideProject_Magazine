'use strict';

//Use cases
const { GetAccessToken, VerifyAccessToken } = require('../../application/use-cases/AuthorizationUseCases');

async function getAccessToken(req, res, next) {
    try {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const { email, password } = req.body;

        //Process
        const token = await GetAccessToken(email, password, serviceLocator);
        
        //Output
        res.status(200).send({
            exitcode: 0,
            token,
            message: ''
        })
    } catch (err) {
        res.status(401).send({
            exitcode: 401,
            token: '',
            message: err.message
        })
    }
}

async function verifyAccessToken(req, res, next) {
    try {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const token = req.body.token || req.headers['x-access-token'] || req.cookies['x-access-token'];
        if (!token) throw {
            code: 900,
            message: 'No token provided'
        }

        //Process
        const payload = await VerifyAccessToken(token, serviceLocator);
        
        //Output
        req.payload = payload;
        next();
    } catch (err) {
        const response = {
            exitcode: err.code || 403,
            token: '',
            message: err.message || ''
        }
        switch (err.name) {
            case 'TokenExpiredError':
                response.exitcode = 901;
                response.message = 'Expired token';
            case 'JsonWebTokenError':
                response.exitcode = 902;
                response.message = 'Invalid token';
                break;
            case 'NotBeforeError':
                response.exitcode = 903;
                response.message = 'Unavailable token';
                break;
            default:
                break;
        }
        res.status(403).send(response)
    }
}

module.exports = {getAccessToken, verifyAccessToken}