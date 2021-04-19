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

    attach(files) {
        this.files = files;
    }

    merge({id, contributor, magazine, title, isSelected}) {
        if (id && this.id != id) this.id = id;
        if (email && this.email != email) this.email = email;
        if (password && this.password != password) this.password = password;
        if (role && this.role != role) this.role = role;
        if (faculty && this.faculty != faculty) this.faculty = faculty;
        if (phone && this.phone != phone) this.phone = phone;
        if (fullname && this.fullname != fullname) this.fullname = fullname;
        if (gender && this.gender != gender) this.gender = gender;
        if (dob && this.dob != dob) this.dob = dob;
    }
}