'use strict';

const { UpdateContribution, CreateContribution } = require("../../application/use-cases/ContributionUseCases");


async function createContribution(req, res, next) {
    //Content
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const contributorId = req.payload.id;
    const { title, magazine, agreement } = req.body;
    const { article, pictures } = req.files;
    const files = Array.from(pictures);

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

    if (!files || files.length < 0) {
        return res.status(200).send({
            exitcode: 1,
            contribution: "",
            message: "Lack of file"
        })
    }

    try {
        //Process
        const contribution = await CreateContribution(contributorId, magazine, title, files, serviceLocator);
        
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

async function updateContribution(req, res, next) {
    //Content
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const contributorId = req.payload.id;
    const { id, title, magazine, agreement } = req.body;
    const { article, pictures } = req.files;
    const files = Array.from(pictures);

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

    if (!files || files.length < 0) {
        return res.status(200).send({
            exitcode: 1,
            contribution: "",
            message: "Lack of file"
        })
    }

    try {
        //Process
        const contribution = await UpdateContribution(id, contributorId, magazine, title, files, serviceLocator);
        
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

module.exports = {
    updateContribution,
    createContribution
}