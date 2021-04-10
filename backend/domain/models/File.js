'use strict';

module.exports = class {

    constructor(id = null, filename, contribution, path, filetype, size, createdAt=null) {
        this.id = id;
        this.filename = filename;
        this.contribution = contribution;
        this.path = path;
        this.filetype = filetype;
        this.size = size;
        this.createdAt = createdAt;
    }

}