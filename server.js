/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

global.config = require('./config');
global._ = require('underscore');
var express = require('express'),
    app = express();
var path = require('path');
var cors = require('cors');
var route = require('./route');
var JWT = require('./lib/JWT');
var cookieParser = require('cookie-parser');

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(cookieParser());

app.use(function(req, res, next) {
    if (_.indexOf(config.server.noTokenUrls, req.originalUrl) == -1) {
        var token = req.body.token || req.headers['x-access-token'] || req.cookies['x-access-token'];

        if (token){
            var decoded = JWT.Decode(token);
      
            if (decoded.exitcode != 1) { //fail
              return res.json({
                exitcode: decoded.exitcode,
                message: decoded.error
              })
            } else {
                req.payload = decoded.data;
                next()
            }
          }
          else {
            return res.status(403).redirect('/account/login');
          }
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