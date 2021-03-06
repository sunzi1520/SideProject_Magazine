'use strict';

const Magazine = require('../../domain/models/Magazine');

module.exports = {
    async CreateMagazine(name, manager_id, published_year, closureDate, finalClosureDate, {accountRepository, magazineRepository}) {
        //#region Pre-condition
            
            //Check if the manager exists
            const manager = await accountRepository.get(manager_id);
            if (!manager || !manager.id) {
                throw new Error("ERR_MANAGER_NOT_EXISTING");
            }
        //#endregion

        //#region Flow
            const magazine = new Magazine(null, manager, name, closureDate, finalClosureDate, published_year)
            return magazineRepository.persist(magazine);
        //#endregion
    },   

    DeleteMagazine(magazineId, {magazineRepository}) {
        return magazineRepository.remove(magazineId);
    },

    GetMagazine(magazineId, {magazineRepository}) {
        return magazineRepository.get(magazineId);
    },

    ListMagazines({magazineRepository}) {
        return magazineRepository.find();
    },

    async UpdateMagazine(magazineId, name, manager_id, published_year, closureDate, finalClosureDate, {accountRepository, magazineRepository}) {
        try {       
            //#region Pre-condition
                //Check if the magazine exists
                const oldMagazine = await magazineRepository.get(magazineId);
                if (!oldMagazine) {
                    throw new Error("ERR_MAGAZINE_NOT_EXISTING");
                }

                //Check if the manager exists
                const manager = await accountRepository.get(manager_id);
                if (!manager || !manager.id) {
                    throw new Error("ERR_MANAGER_NOT_EXISTING");
                }

            //#endregion

            //#region Flow
                const newMagazine = new Magazine(null, manager, name, closureDate, finalClosureDate, published_year)
                oldMagazine.merge(newMagazine);
                console.log(oldMagazine);
                return magazineRepository.merge(oldMagazine);
            //#endregion
        } catch(err) {
            throw err
        }
    },

    async DownloadSelectedContributions(magazineId, { fileSystem, magazineRepository, contributionRepository }, callback) {
        const magazine = await magazineRepository.get(magazineId);
        let name = magazine.name.split(' ').join('-');
        let contributionList = await contributionRepository.getWithFilter({magazineId, isSelected: true});
        contributionList = await contributionList.map(contribution => contribution.id.toString());
        return fileSystem.GetCompressedDirectories(magazineId, contributionList, name, callback);
    }
}
