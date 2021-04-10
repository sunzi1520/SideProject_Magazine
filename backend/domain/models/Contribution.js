'use strict';

module.exports = class {

    constructor(id = null, contributor, magazine, title, isSelected = false, createdAt=null, updatedAt=null) {
        this.id = id;
        this.contributor = contributor;
        this.magazine = magazine;
        this.title = title;
        this.isSelected = isSelected;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}