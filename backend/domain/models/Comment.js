'use strict';

module.exports = class {

    constructor(id = null, createdBy, content, contribution, createdAt=null, updatedAt=null) {
        console.log(id, ' ', createdBy, ' ', content, ' ', contribution, ' ', createdAt, ' ', updatedAt);
        this.id = id;
        this.createdBy = createdBy; //o_Account
        this.content = content;
        this.contribution = contribution //o_Contribution
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    merge(commentEntity) {
        Object.keys(this).forEach((key) => {
            if (commentEntity[key] && this[key] != commentEntity[key])
             this[key] = commentEntity[key]
            });
    }
}