'use strict';

//Application
const {UploadFiles} = require('./FileUseCases');

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
        if (new Date() >= new Date(magazine.closureDate)) {
            throw new Error('ERR_NEW_ENTRY_DENIED');
        }

        //#endregion

        //#region Flow
        
        const newContribution = new Contribution(null, contributor, magazine, title);
        const contribution = await contributionRepository.persist(newContribution);

        if (files) {
            const attachedFiles = await UploadFiles(files, contribution, {fileSystem, fileRepository});
            contribution.attach(attachedFiles);
        }

        return contribution;

        //#endregion
    } catch(err) {
        throw err
    }
}

async function UpdateContribution(id, contributorId, magazineId, title, files,
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
            if (new Date() >= new Date(magazine.finalClosureDate)) {
            throw new Error('ERR_MODIFIED_ENTRY_DENIED');
            }

        //#endregion

        //#region Flow
            const oldContribution = await contributionRepository.get(id);
            const newContribution = new Contribution(null, contributor, magazine, title);
            await oldContribution.merge(newContribution);
            const contribution = await contributionRepository.merge(oldContribution);

            if (files) {
                const attachedFiles = await UploadFiles(files, contribution, {fileSystem, fileRepository});
                contribution.attach(attachedFiles);
            }

            return contribution;

        //#endregion
    } catch(err) {
        throw err
    }
}

module.exports = { UpdateContribution, CreateContribution }