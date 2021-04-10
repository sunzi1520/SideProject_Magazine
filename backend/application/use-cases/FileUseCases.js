'use strict';

const File = require('../../domain/models/File');

module.exports = {
    
    /** Upload a file
     * Actor: Student
     * @param {File} file 
     * @param {String|ObjectId} contribution
     * @param {String|ObjectId} contributor
     * @return {FileEntity}
     */
    async UploadFile(file, contribution, { fileManager, fileRepository }) {
        try {
            //Store file into file storage
            const storedFile = await fileManager.storeContribution(file, contribution);
            //Record into database
            const fileEntity = new File(null, storedFile.filename, storedFile.path, contribution, storedFile.filetype, storedFile.size);
            return fileRepository.persist(fileEntity);
        } catch(err) {
            throw err;
        }
    },

    /** Download a file
     * Actor: Administrator, Manager, Coordinator, Student
     * @param {String|ObjectId} fileId
     * @return ??
     */
    async GetFile(filename, { fileRepository }) {
        return fileRepository.getByFilename(filename);       
    },

    /** Delete a file
     * Actor: Administrator
     */
    async DeleteFile(fileId, { fileManager, fileRepository }) {
        //Remove from db

        //Delete file from the storage

        //Return
    },

    /** GetArchivedC
     * 
     */
    async GetArchivement( contribution, contributor, {fileManager, fileRepository} ) {
        //Get list of files to be archived
        
        //Archive files

        //Return
    }
}