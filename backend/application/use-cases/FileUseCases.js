'use strict';

const File = require('../../domain/models/File');

async function UploadFiles(files, contribution, { contributionRepository, fileSystem, fileRepository }) {
    try {
        //#region Pre-conditions
        
            //Check if the contribution exists
            if (typeof contribution == 'string'){
                const contribution = contributionRepository.get(contribution);
            }
            if (!contribution || !contribution.id) {
                throw new Error("ERR_CONTRIBUTION_NOT_EXISTING");
            }

        //#endregion
        
        //#region Flow

            let result = [];

            for (let file of files) {
                let newFile = await fileSystem.Store(file, contribution.magazine.id, contribution.id);
                console.log('New File: ', newFile);
                if (newFile.exitcode == 0) {
                    let entityFile = new File(null, newFile.name, contribution, newFile.path, file.mimetype);
                    try {
                        entityFile = await fileRepository.persist(entityFile);
                    } catch(err) {
                        throw err;
                    }
                    result.push(entityFile);
                }
            }
        
            return result;

        //#endregion
    } catch(err) {
        throw err;
    }
}

module.exports = {

    UploadFiles,

    /** Download a file
     * Actor: Administrator, Manager, Coordinator, Student
     * @param {String|ObjectId} fileId
     * @return ??
     */
    async GetFile(id, { fileSystem, fileRepository }) {
        const file = await fileRepository.getByFilename(filename);
        if (!file || !file.id) {
            throw new Error("ERR_FILE_NOT_FOUND");
        }
        return fileSystem.GetAbsoluteStoragePath(file.path + file.name);     
    },

    /** Delete a file
     * Actor: Administrator, Student, Manager, Coordinator
     */
    async DeleteFile(fileId, { fileSystem, fileRepository }) {
        //Remove from db
        const file = await fileRepository.remove(fileId);
        if (!file || !file.id) {
            throw new Error("ERR_FILE_NOT_FOUND");
        }

         //Delete file from the storage
        await fileSystem.Remove(file.path + file.name);

        //Return
        return true;
    },

    /** GetArchivedC
     * 
     */
    async GetArchivement( contribution, contributor, {fileSystem, fileRepository} ) {
        //Get list of files to be archived
        
        //Archive files

        //Return
    }
}