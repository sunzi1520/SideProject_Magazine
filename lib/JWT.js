'use strict'

const config = require('../config');
var jwt = require('jsonwebtoken');

module.exports = {
  Encode: encode,
  Decode: decode
}

function encode(payload, exptime) {
  return jwt.sign(payload, config.security.secret, {
    expiresIn: parseInt(exptime)
  });
}


function decode(token) {
  var ret = {
    "exitcode": 0,
    "data": null,
    "error": null,
  };

  try{
    ret.exitcode = 1;
    ret.data = jwt.verify(token, config.security.secret);
  } catch (err) {
    ret.error = err.message;

    switch (err.name) {
      case 'TokenExpiredError':
        ret.exitcode = 901;
        break;
      case 'JsonWebTokenError':
        ret.exitcode = 903;
        break;
      case 'NotBeforeError':
        ret.exitcode = 904;
        break;
      default:
        ret.exitcode = 0;
        break;
    }
  }

  return ret;
}
