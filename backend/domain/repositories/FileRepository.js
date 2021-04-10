'use strict';

module.exports = class {
    
    persist(domainFile) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    merge(domainFile) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    remove(fileId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    get(fileId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    find() {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}