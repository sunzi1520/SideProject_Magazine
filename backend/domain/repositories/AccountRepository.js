'use strict';

module.exports = class {
    
    persist(domainAccount) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    mergeInformation(domainAccount) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    remove(accountId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    get(accountId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getByUsername(accountUsername) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    find() {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}