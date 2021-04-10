'use strict';

module.exports = class {

    constructor(id = null, manager, name, 
                closureDate, finalClosureDate, coordinators = [],   
                published_year = (new Date()).getFullYear(), isLocked = false, createdAt=null) {
        this.id = id;
        this.manager = manager;
        this.name = name;
        this.published_year = (new Date(published_year.toString())).getFullYear() || published_year.toString() || (new Date()).getFullYear();
        this.closureDate = closureDate;
        this.finalClosureDate = finalClosureDate;
        this.isLocked = isLocked;
        if (!Array.isArray(coordinators)) 
            if (coordinators) this.coordinators = new Array(coordinators);
            else this.coordinators = new Array();
        else this.coordinators = coordinators;
        this.createdAt = createdAt;
    }

}