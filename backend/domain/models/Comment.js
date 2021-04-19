'use strict';

module.exports = class {

    constructor(id = null, createdBy, content, contribution, replyTo=null, replies=[], createdAt=null, updatedAt=null) {
        this.id = id;
        this.createdBy = createdBy; //o_Account
        this.content = content;
        this.contribution = contribution //o_Contribution
        this.replyTo = replyTo; //o_Comment
        this.replies = replies; //o_Comment[]
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}