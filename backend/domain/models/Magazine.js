'use strict';

module.exports = class {

    constructor(id = null, manager, name, 
                closureDate, finalClosureDate, published_year = (new Date()).getFullYear(), createdAt=null) {
        this.id = id;
        this.manager = manager; //o_Manager
        this.name = name;
        this.published_year = (new Date(published_year.toString())).getFullYear() || published_year.toString() || (new Date()).getFullYear();
        this.closureDate = closureDate;
        if (closureDate) {
                this.closureDate = (new Date(closureDate));
        }
        this.finalClosureDate = finalClosureDate;
        if (finalClosureDate) {
                this.finalClosureDate = (new Date(finalClosureDate));
        }
        this.createdAt = createdAt;
    }

    merge({ id, manager, name, 
        closureDate, finalClosureDate, published_year, isLocked }) {
        if (id && this.id != id) this.id = id;
        if (manager && this.manager != manager) this.manager = manager;
        if (name && this.name != name) this.name = name;
        if (closureDate && this.closureDate != closureDate) this.closureDate = closureDate;
        if (finalClosureDate && this.finalClosureDate != finalClosureDate) this.finalClosureDate = finalClosureDate;
        if (published_year && this.published_year != published_year) this.published_year = published_year;
        if (isLocked && this.isLocked != isLocked) this.isLocked = isLocked;
    }

}