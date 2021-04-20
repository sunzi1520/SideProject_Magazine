'use strict';

module.exports = class {

    constructor(id = null, manager, name, 
                closureDate, finalClosureDate, coordinators = [],   
                published_year = (new Date()).getFullYear(), isLocked = false, createdAt=null) {
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
        this.isLocked = isLocked;
        this.coordinators = coordinators;
        if (!Array.isArray(coordinators)) //[o_Coordinator]
            if (coordinators) this.coordinators = new Array(coordinators);
            else this.coordinators = new Array();
        this.createdAt = createdAt;
    }

    merge({ id, manager, name, 
        closureDate, finalClosureDate, coordinators,   
        published_year, isLocked }) {
        if (id && this.id != id) this.id = id;
        if (manager && this.manager != manager) this.manager = manager;
        if (name && this.name != name) this.name = name;
        if (closureDate && this.closureDate != closureDate) this.closureDate = closureDate;
        if (finalClosureDate && this.finalClosureDate != finalClosureDate) this.finalClosureDate = finalClosureDate;
        if (coordinators && this.coordinators != coordinators) this.coordinators = coordinators;
        if (published_year && this.published_year != published_year) this.published_year = published_year;
        if (isLocked && this.isLocked != isLocked) this.isLocked = isLocked;
    }

}