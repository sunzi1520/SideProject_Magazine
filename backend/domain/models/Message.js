'use strict';

module.exports = class {

    constructor(id = null, sender, receiver, content, 
                isRead = false, readAt = null, sentAt=null) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.receiver = receiver;
        this.content = content;
        this.isRead = isRead;
        this.readAt = readAt;
        this.sentAt = sentAt;
    }

}