'use strict';

module.exports = class {
    
    persist(domainContribution) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    merge(domainContribution) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    remove(contributionId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    get(contributionId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    find() {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}