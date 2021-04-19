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

}