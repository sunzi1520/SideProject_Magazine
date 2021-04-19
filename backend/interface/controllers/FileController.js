'use strict';

const { DeleteFile, GetFile } = require("../../application/use-cases/FileUseCases");


async function deleteFile(req, res, next) {
    //Content
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {id} = req.params;

    try {
        //Process
        const status = await DeleteFile(id, serviceLocator);
        
        //Output
        res.status(200).send({
            exitcode: 0,
            file: serviceLocator.fileSerializer.serialize(contribution.files),
            message: ''
        })
    } catch (err) {
        res.status(500).send({
            exitcode: err.code || 1,
            file: {},
            message: err.message || err || 'Unknown'
        })
    }

}

async function getFile(req, res, next) {
    //Content
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {id} = req.params;

    try {
        //Process
        const file = await GetFile(id, serviceLocator);
        
        //Output
        res.status(200).download(file.path + file.name)
    } catch (err) {
        res.status(500).send({
            exitcode: err.code || 1,
            message: err.message || err || 'Unknown'
        })
    }
}

module.exports = {
    deleteFile,
    getFile
}