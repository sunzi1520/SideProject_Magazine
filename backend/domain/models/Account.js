'use strict';

module.exports = class {

    constructor (id = null, 
                 email, password, role, faculty,
                 fullname = null, gender=null, dob = null, phone = null,
                 createdAt = null, updatedAt = null) {
        //General
        this.id = id;
        this.email = email;
        this.password = password,
        this.role = role;
        this.faculty = faculty; //o_Faculty
        //Information
        this.fullname = fullname;
        this.gender = gender;
        this.dob = dob;
        if (dob) {
            this.dob = (new Date(dob));
        }
        this.phone = phone;
        //Record
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    merge({id, email, password, role, faculty, fullname, gender, dob, phone}) {
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