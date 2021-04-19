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

    getAll() {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getByEmail(email) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getByRole(role) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getManyByIds(idList) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}