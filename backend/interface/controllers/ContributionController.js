'use strict';

const { ChangeTitle, CreateContribution, GetContribution, GetContributionByFaculty } = require("../../application/use-cases/ContributionUseCases");
const { UploadFiles, GetFilesByContribution } = require("../../application/use-cases/FileUseCases");


async function createContribution(req, res, next) {
    //Content
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const contributorId = req.payload.id;
    const { title, magazine, agreement } = req.body;
    const { article, pictures } = req.files;
    let files = [];
    if (pictures) 
        files = await Array.from(pictures);

    ////Check agreement
    if (!agreement) {
        return res.status(200).send({
            exitcode: 1,
            contribution: "",
            message: "Lack of agreement"
        })
    }

    ////Prepare files
    files.push(article);
    if (!title || !magazine) {
        return res.status(200).send({
            exitcode: 1,
            contribution: "",
            message: "Input invalid"
        })
    }

    try {
        //Process
        const contribution = await CreateContribution(contributorId, magazine, title, serviceLocator);

        if (files){
            const attachedFiles = await UploadFiles(files, contribution, {fileSystem, fileRepository});
            contribution.attach(attachedFiles);
        }
        
        contribution.files = await serviceLocator.fileSerializer.serialize(contribution.files);
        //Output
        res.status(200).send({
            exitcode: 0,
            contribution: serviceLocator.contributionSerializer.serialize(contribution),
            message: ''
        })
    } catch (err) {
        res.status(500).send({
            exitcode: err.code || 1,
            contribution: {},
            message: err.message || err || 'Unknown'
        })
    }

}

async function changeTitle(req, res, next) {
    //Content
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const { id } = req.params;
    const { title } = req.body;

    try {
        //Process
        const contribution = await ChangeTitle(id, title, serviceLocator);
        
        //Output
        res.status(200).send({
            exitcode: 0,
            contribution: serviceLocator.contributionSerializer.serialize(contribution),
            message: ''
        })
    } catch (err) {
        res.status(500).send({
            exitcode: err.code || 1,
            contribution: {},
            message: err.message || err || 'Unknown'
        })
    }

}

async function getContribution(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {id} = req.params;

    try {
        //Process
        const contribution = await GetContribution(id, serviceLocator);
        console.log(contribution);

        //Output
        return res.status(200).send({
            exitcode: 0,
            contribution: serviceLocator.contributionSerializer.serialize(contribution),
            message: ''
        })

    } catch(err) {
        res.status(500).send({
            exitcode: err.code || 1,
            contribution: {},
            message: err.message || err || 'Unknown'
        })
    }
}

async function getContributionByFaculty(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {faculty} = req.params;

    try {
        //Process
        const contribution = await GetContributionByFaculty(faculty, serviceLocator);
        console.log(contribution);

        //Output
        return res.status(200).send({
            exitcode: 0,
            contribution: serviceLocator.contributionSerializer.serialize(contribution),
            message: ''
        })

    } catch(err) {
        res.status(500).send({
            exitcode: err.code || 1,
            contribution: {},
            message: err.message || err || 'Unknown'
        })
    }
}

module.exports = {
    createContribution,
    changeTitle,
    getContribution,
    getContributionByFaculty
}