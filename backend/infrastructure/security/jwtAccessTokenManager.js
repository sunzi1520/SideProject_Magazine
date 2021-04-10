'use strict';

const jwt = require('jsonwebtoken');

const AccessTokenManager = require('../../application/security/AccessTokenManager');

const JWT_SECRET_KEY = 'group4#eterpr1s3w3b~4ppl1c4t10nDEVEL0pMen~t';
const EXPIRED_TIME = 60 * 60 * 2 //2 hours

module.exports = class extends AccessTokenManager {

  generate(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: EXPIRED_TIME
    });
  }

  decode(accessToken) {
    return jwt.verify(accessToken, JWT_SECRET_KEY);
  }

};