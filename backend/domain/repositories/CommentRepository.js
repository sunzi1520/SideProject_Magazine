'use strict';

module.exports = class {
    
    persist(domainComment) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    merge(domainComment) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    remove(commentId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    get(commentId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    find() {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}