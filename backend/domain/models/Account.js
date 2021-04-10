'use strict';

module.exports = class {
    constructor (id = null, 
                 username, password, role, faculty, 
                 email = null, phone = null, fullname = null, gender=null, dob = null,
                 isActive = null, lastAccess = null,
                 createdAt = null, updatedAt = null) {
        //General
        this.id = id;
        this.username = username;
        this.password = password,
        this.role = role;
        this.faculty = faculty;
        this.isActive = isActive;
        this.lastAccess = lastAccess;
        //Information
        this.fullname = fullname;
        this.gender = gender;
        this.dob = dob;
        if (dob) {
            this.dob = (new Date(dob)).toISOString();
        }
        this.email = email;
        this.phone = phone;
        //Record
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}