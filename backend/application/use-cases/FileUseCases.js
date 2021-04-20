'use strict';

const File = require('../../domain/models/File');

async function GetFilesByContribution(contributionId, {fileRepository}) {
    return fileRepository.getByContribution(contributionId);
}

async function UploadFiles(files, contribution, { contributionRepository, fileSystem, fileRepository }) {
    try {
        //#region Pre-conditions

            let uContribution = contribution;
            //Check if the contribution exists
            if (typeof contribution == 'string'){
                uContribution = await contributionRepository.get(contribution);
            }
            
            if (!uContribution || !uContribution.id) {
                throw new Error("ERR_CONTRIBUTION_NOT_EXISTING");
            }

        //#endregion
        
        //#region Flow

            let result = [];

            for (let file of files) {
                let newFile = await fileSystem.Store(file, uContribution.magazine.id, uContribution.id);
                if (newFile.exitcode == 0) {
                    let entityFile = new File(null, newFile.name, uContribution, newFile.path, file.mimetype);
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


async function DownloadFile(id, { fileSystem, fileRepository }) {
    const file = await fileRepository.get(id);
    if (!file || !file.id) {
        throw new Error("ERR_FILE_NOT_FOUND");
    }
    return fileSystem.GetAbsoluteStoragePath(file.path + file.filename);     
}

async function DeleteFile(fileId, { fileSystem, fileRepository }) {
    //Remove from db
    const file = await fileRepository.remove(fileId);
    if (!file || !file.id) {
        throw new Error("ERR_FILE_NOT_FOUND");
    }

     //Delete file from the storage
    await fileSystem.Remove(file.path + file.filename);

    //Return
    return file;
}

module.exports = {
    UploadFiles,
    DownloadFile,
    DeleteFile,
    GetFilesByContribution
}