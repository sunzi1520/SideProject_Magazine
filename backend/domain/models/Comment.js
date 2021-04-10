'use strict';

module.exports = class {

    constructor(id = null, createdBy, content, contribution, replyTo=null, replies=[], createdAt=null, updatedAt=null) {
        this.id = id;
        this.createdBy = createdBy;
        this.content = content;
        this.contribution = contribution
        this.replyTo = replyTo;
        this.replies = replies;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}