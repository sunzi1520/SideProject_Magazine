'use strict';

//Application
const {UploadFiles, GetFilesByContribution } = require('./FileUseCases');

//Domain
const Contribution = require('../../domain/models/Contribution');

async function CreateContribution(contributorId, magazineId, title, files,
                                  {accountRepository, magazineRepository, contributionRepository, fileSystem, fileRepository}) {
    try {
        //#region Pre-conditions
        
        //Restrict: A contribution must have at least a file
        /*Group decision: Remove the restriction at 15 Apr 2021
        if (!files) {
            throw new Error('ERR_FILE_NOT_FOUND');
        } */

        //Check if contributor exists
        const contributor = await accountRepository.get(contributorId);
        if (!contributor) {
            throw new Error('ERR_CONTRIBUTOR_NOT_EXISTING');
        }

        //Check if magazine exists
        const magazine = await magazineRepository.get(magazineId);
        if (!magazine) {
            throw new Error('ERR_MAGAZINE_NOT_EXISTING');
        }

        //Restrict: First due of the magazine is not over
        if (new Date() > new Date(magazine.closureDate)) {
            throw new Error('ERR_NEW_ENTRY_DENIED');
        }

        //#endregion

        //#region Flow
        
        const newContribution = new Contribution(null, contributor, magazine, title);
        return await contributionRepository.persist(newContribution);

        //#endregion
    } catch(err) {
        throw err
    }
}

async function ChangeTitle(id, title, {contributionRepository}) {
    try {
        //#region Pre-conditions

            //Check if contribution exists
            const oldContribution = await contributionRepository.get(id);
            if (!oldContribution) {
                throw new Error('ERR_CONTRIBUTION_NOT_EXISTING');
            }

            //Restrict: Final due of the magazine is not over
            if (new Date() > new Date(oldContribution.magazine.finalClosureDate)) {
                throw new Error('ERR_MODIFIED_ENTRY_DENIED');
            }

        //#endregion

        //#region Flow
        
            const newContribution = new Contribution(null, null, null, title);
            await oldContribution.merge(newContribution);
            return contributionRepository.merge(oldContribution);

        //#endregion
    } catch(err) {
        throw err
    }
}

async function GetContribution(id, {contributionRepository}) {
    return contributionRepository.get(id);
}

async function GetContributionByFaculty(faculty, {contributionRepository}) {
    return contributionRepository.getByFaculty(faculty);
}

module.exports = { CreateContribution, ChangeTitle, GetContribution, GetContributionByFaculty }