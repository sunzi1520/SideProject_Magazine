'use strict';

//Use cases
const { CreateMagazine, GetMagazine, DeleteMagazine, ListMagazines, UpdateMagazine, DownloadSelectedContributions } = require('../../application/use-cases/MagazineUseCases');

module.exports = {
    async createMagazine(req, res, next) {
        //context
        const serviceLocator = req.server.app.serviceLocator;

        //input
        const {manager_id, name, published_year, closureDate, finalClosureDate, isLocked, coordinators} = req.body;
        let coordinatorList = [];
        if (coordinators) coordinatorList = await Array.from(coordinators);

        //process
        try { 
            const magazine = await CreateMagazine(name, manager_id, published_year, closureDate, finalClosureDate, coordinatorList, isLocked, serviceLocator);
            
            //output
            res.status(200).send({
                exitcode: 0,
                magazine,
                message: ''
            })
        } catch (err) {
            console.log('CreateMagazine from MagazineController: err:: ', err);
            res.status(500).send({
                exitcode: err.code || 1,
                magazine: {},
                message: err.message || err || 'Unknown'
            })
        }
    },

    async deleteMagazine(req, res, next) {
        //context
        const serviceLocator = req.server.app.serviceLocator;

        //input
        const {magazineId} = req.params;

        //process
        try { 
            const magazine = await DeleteMagazine(magazineId, serviceLocator);
    
            //output
            res.status(200).send({
                exitcode: 0,
                magazine,
                message: ''
            })
        } catch (err) {
            console.log('DeleteMagazine from MagazineController: err:: ', err);
            res.status(500).send({
                exitcode: err.code || 1,
                magazine: {},
                message: err.message || err || 'Unknown'
            })
        }
    },

    async getMagazine(req, res, next) {
        //context
        const serviceLocator = req.server.app.serviceLocator;

        //input
        const {magazineId} = req.params;

        //process
        try { 
            const magazine = await GetMagazine(magazineId, serviceLocator);
    
            //output
            res.status(200).send({
                exitcode: 0,
                magazine,
                message: ''
            })
        } catch (err) {
            console.log('GetMagazine from MagazineController: err:: ', err);
            res.status(500).send({
                exitcode: err.code || 1,
                magazine: {},
                message: err.message || err || 'Unknown'
            })
        }
    },

    async listMagazines(req, res, next) {
        //context
        const serviceLocator = req.server.app.serviceLocator;

        //input

        //process
        try { 
            const magazines = await ListMagazines(serviceLocator);
    
            //output
            res.status(200).send({
                exitcode: 0,
                magazines,
                message: ''
            })
        } catch (err) {
            console.log('ListMagazines from MagazineController: err:: ', err);
            res.status(500).send({
                exitcode: err.code || 1,
                magazines: [],
                message: err.message || err || 'Unknown'
            })
        }
    },

    async updateMagazine(req, res, next) {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const { magazineId } = req.params
        const {manager_id, name, published_year, closureDate, finalClosureDate, isLocked, coordinators} = req.body;
        let coordinatorList = [];
        if (coordinators) coordinatorList = await Array.from(coordinators);

        try {
            //Process
            const magazine = await UpdateMagazine(magazineId, name, manager_id, published_year, closureDate, finalClosureDate, coordinatorList, isLocked, serviceLocator);
            
            //output
            res.status(200).send({
                exitcode: 0,
                magazine,
                message: ''
            })
    
         } catch(err) {
            res.status(500).send({
                exitcode: err.code || 500,
                magazine: {},
                message: err.message || err || 'Unknown'
            })
        } 
    },

    async downloadSelectedContributions(req, res, next) {
        //Context
        const serviceLocator = req.server.app.serviceLocator;

        //Input
        const { magazineId } = req.params

        try {
            //Process
            DownloadSelectedContributions(magazineId, serviceLocator, (path) => {
                res.status(200).download(path);
            });
            
         } catch(err) {
            res.status(500).send({
                exitcode: err.code || 500,
                magazine: {},
                message: err.message || err || 'Unknown'
            })
        } 
    }
}
