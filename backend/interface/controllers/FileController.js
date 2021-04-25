'use strict';

const { DeleteFile, DownloadFile, UploadFiles } = require("../../application/use-cases/FileUseCases");

async function deleteFile(req, res, next) {
    //Content
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {id} = req.params;

    try {
        //Process
        const file = await DeleteFile(id, serviceLocator);

        console.log(file);
        
        //Output
        res.status(200).send({
            exitcode: 0,
            file: serviceLocator.fileSerializer.serialize(file),
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

async function downloadFile(req, res, next) {
    //Content
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {id} = req.params;

    try {
        //Process
        const file = await DownloadFile(id, serviceLocator);
        
        //Output
        res.status(200).download(file)
    } catch (err) {
        res.status(500).send({
            exitcode: err.code || 1,
            message: err.message || err || 'Unknown'
        })
    }
}

async function uploadFiles(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {contributionId} = req.params;
    const {article, pictures} = req.files;
    const {agreement} = req.body;
    let files = [];
    if (pictures) {
        if (Array.isArray(pictures)){
            files = await Array.from(pictures);
        } else {
            files = new Array(pictures);
        }
    }
    files.push(article);

    if (!files || files.length == 0) {
        return res.status(200).send({
            exitcode: 1,
            files: "",
            message: "Invalid input"
        })
    }

    if (!agreement) {
        return res.status(200).send({
            exitcode: 1,
            files: "",
            message: "Lack of agreement"
        })
    }

    try {
        //Process
        const uploadedFiles = await UploadFiles(files, contributionId, serviceLocator);

        //Output

        ////Send email
        //////Get coordinator list
        const contribution = uploadedFiles[0].contribution;
        const contributorFaculty = req.payload.faculty;
        const coordinators = await ListAccountsByRole('coordinator', serviceLocator);
        if (coordinators){
            let emailList = []
            await coordinators.forEach(coordinator => {
                if (coordinator.faculty == contributorFaculty) {
                    emailList.push(coordinator.email);
                }
            });
            serviceLocator.mailer.sendMail(emailList, `A student in your faculty has uploaded new file(s) into the contribution ${contribution.title}. Check it!`, 'New contribution in your faculty');
        }

        res.status(200).send({
            exitcode: 0,
            files: serviceLocator.fileSerializer.serialize(uploadedFiles),
            message: ''
        })
    } catch(err) {
        res.status(500).send({
            exitcode: err.code || 1,
            files: [],
            message: err.message || err || 'Unknown'
        })
    }
}

module.exports = {
    deleteFile,
    downloadFile,
    uploadFiles
}