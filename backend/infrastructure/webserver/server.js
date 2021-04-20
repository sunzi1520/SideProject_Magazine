'use strict'

const environment = require('../config/environment');
const _ = require('lodash');
const express = require('express'),
    app = express();
const cors = require('cors'),
      fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const AuthorizationController = require('../../interface/controllers/AuthorizationController');
const { createFirstAdmin } = require('../../interface/controllers/AccountController');

const createServer = () => {
    app.use(fileUpload({
        createParentPath: true
    }));
    
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(morgan('dev'));
    
    app.use(function (req, res, next) {
        if (!req.server || !req.server.app || !req.server.app.serviceLocator) {
            req.server = {
                app: {
                    serviceLocator: require('../config/server-locator')
                }
            }
        }
        next();
    })

    app.use('/auth', require('../../interface/routes/auth'));
    app.use('/accounts', AuthorizationController.verifyAccessToken, require('../../interface/routes/account'));
    app.use('/magazines', AuthorizationController.verifyAccessToken, require('../../interface/routes/magazine'));
    app.use('/contributions', AuthorizationController.verifyAccessToken, require('../../interface/routes/contribution'));
    app.use('/comments', AuthorizationController.verifyAccessToken, require('../../interface/routes/comment'));
    app.use('/files', require('../../interface/routes/file'));

    app.use(function(req, res, next) {
        res.status(404).end();
    })
    
    app.on('ready', () => {
        app.listen(environment.server.port, ()=>{
            createFirstAdmin();
            console.log(`The server is listening on the port ${environment.server.port}...`);
        })
    });
    
    return app;
}

module.exports = createServer;