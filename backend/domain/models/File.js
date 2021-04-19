'use strict';

module.exports = class {

    constructor(id = null, filename, contribution, path, filetype, createdAt=null) {
        this.id = id;
        this.filename = filename;
        this.contribution = contribution; //o_Contribution
        this.path = path;
        this.filetype = filetype;
        this.createdAt = createdAt;
    }

}