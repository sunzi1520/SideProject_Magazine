/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

global.config = require('./config.js');
global._ = require('underscore');
var express = require('express'),
    app = express();
var path = require('path');
var cors = require('cors');
var route = require('./route');

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(function(req, res, next) {
    if (_.indexOf(config.server.noTokenUrls, req.originalUrl) == -1) {
        next();
    }
    else {
        next();
    }
})

route.assignRoutes(app);

app.use(function(req, res, next) {
    res.status(404).render('404');
})

app.listen(config.server.port, () => {
    console.log(`The server listening on the port ${config.server.port}`);
})