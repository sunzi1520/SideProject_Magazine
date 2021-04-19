'use strict';

const Magazine = require('../../domain/models/Magazine');
const MongooseMagazine = require('../orm/mongoose/schemas/Magazine');
const MagazineRepository = require('../../domain/repositories/MagazineRepository');

module.exports = class extends MagazineRepository {

    async persist(magazineEntity) {
        const manager = magazineEntity.manager.id;
        const coordinators = Array.from(magazineEntity.coordinators, coordinator => coordinator.id);
        const { name, published_year, closureDate, finalClosureDate, isLocked } = magazineEntity;
        const mongooseMagazine = new MongooseMagazine({manager, name, published_year, closureDate, finalClosureDate, isLocked, coordinators});
        await mongooseMagazine.save();
        await mongooseMagazine.populate('manager', '_id username role information.fullname').execPopulate();
        await mongooseMagazine.populate('coordinators', '_id username role faculty information.fullname information.email').execPopulate();
        return new Magazine(mongooseMagazine.id, mongooseMagazine.manager, mongooseMagazine.name, mongooseMagazine.closureDate, mongooseMagazine.finalClosureDate, mongooseMagazine.coordinators, mongooseMagazine.published_year, mongooseMagazine.isLocked, mongooseMagazine.createdAt);
    }

    async merge(magazineEntity) {

    }

    async remove(magazineId) {
        const mongooseMagazine = await MongooseMagazine.findOneAndDelete({_id: magazineId});
        return new Magazine(mongooseMagazine.id, mongooseMagazine.manager, mongooseMagazine.name, mongooseMagazine.closureDate, mongooseMagazine.finalClosureDate, mongooseMagazine.coordinators, mongooseMagazine.published_year, mongooseMagazine.isLocked, mongooseMagazine.createdAt);
    }

    async get(magazineId) {
        const mongooseMagazine = await MongooseMagazine.findOne({_id: magazineId});
        if (mongooseMagazine) {
            await mongooseMagazine.populate('manager', '_id username role information.fullname information.email').execPopulate();
            await mongooseMagazine.populate('coordinators', '_id username role faculty information.fullname information.email').execPopulate();
        }
        return new Magazine(mongooseMagazine.id, mongooseMagazine.manager, mongooseMagazine.name, mongooseMagazine.closureDate, mongooseMagazine.finalClosureDate, mongooseMagazine.coordinators, mongooseMagazine.published_year, mongooseMagazine.isLocked, mongooseMagazine.createdAt);
    }

    async find() {
        const mongooseMagazines = await MongooseMagazine.aggregate([
            {$match: {}},
            {$lookup: {
                from: 'Accounts',
                let: {managerId: '$manager'},
                pipeline: [
                    {$match: {$expr: {$eq: ['$_id', '$$managerId']}}},
                    {$project: {_id: 1, username: 1, role: 1, 'information.fullname': 1, 'information.email': 1}}
                ],
                as: 'manager'
            }},
            {$unwind: '$manager'},
            {$lookup: {
                from: 'Accounts',
                let: {coordinatorsId: '$coordinators'},
                pipeline: [
                    {$match: {$expr: {$in: ['$_id', '$$coordinatorsId']}}},
                    {$project: {_id: 1, username: 1, role: 1, faculty: 1, 'information.fullname': 1, 'information.email': 1}}
                ],
                as: 'coordinators'
            }},
        ]);
        return mongooseMagazines.map((mongooseMagazine) => {
            return new Magazine(mongooseMagazine._id, mongooseMagazine.manager, mongooseMagazine.name, mongooseMagazine.closureDate, mongooseMagazine.finalClosureDate, mongooseMagazine.coordinators, mongooseMagazine.published_year, mongooseMagazine.isLocked, mongooseMagazine.createdAt);
        })
    }

}