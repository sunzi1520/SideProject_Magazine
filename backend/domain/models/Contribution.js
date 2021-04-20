'use strict';

module.exports = class {

    constructor(id = null, contributor, magazine, title, isSelected = false, createdAt=null, updatedAt=null) {
        this.id = id;
        this.contributor = contributor; //o_Account
        this.magazine = magazine; //o_Magazine
        this.title = title;
        this.isSelected = isSelected;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async attach(files) {
        this.files = files;
    }

    merge({id, contributor, magazine, title, isSelected}) {
        if (id && this.id != id) this.id = id;
        if (contributor && this.contributor != contributor) this.contributor = contributor;
        if (magazine && this.magazine != magazine) this.magazine = magazine;
        if (title && this.title != title) this.title = title;
        if (isSelected && this.isSelected != isSelected) this.isSelected = isSelected;
    }
}