'use strict';

module.exports = class {

    generate(payload) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    decode(token) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
  
  };