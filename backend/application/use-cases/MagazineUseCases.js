'use strict';

const Magazine = require('../../domain/models/Magazine');

module.exports = {
    CreateMagazine(name, manager_id, published_year, closureDate, finalClosureDate, coordinators, isLocked, {magazineRepository}) {
        const magazine = new Magazine(null, manager_id, name, closureDate, finalClosureDate, coordinators, published_year, isLocked)
        return magazineRepository.persist(magazine);
    },   

    DeleteMagazine(magazineId, {magazineRepository}) {
        return magazineRepository.remove(magazineId);
    },

    GetMagazine(magazineId, {magazineRepository}) {
        return magazineRepository.get(magazineId);
    },

    ListMagazines({magazineRepository}) {
        return magazineRepository.find();
    }
}
