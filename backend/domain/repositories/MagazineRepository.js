'use strict';

module.exports = class {
    
    persist(domainMagazine) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    merge(domainMagazine) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    remove(magazineId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    get(magazineId) {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    find() {
      throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}