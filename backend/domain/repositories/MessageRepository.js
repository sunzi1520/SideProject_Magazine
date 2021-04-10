'use strict';

module.exports = class {
    
    persist(domainMessage) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    merge(domainMessage) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    remove(messageId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    get(messageId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    find() {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}