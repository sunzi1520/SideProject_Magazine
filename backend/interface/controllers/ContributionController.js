'use strict';

const { ChangeTitle, CreateContribution, GetContribution, GetContributionByFaculty, ListContributions, ListContributionsByAccount } = require("../../application/use-cases/ContributionUseCases");
const { UploadFiles, GetFilesByContribution } = require("../../application/use-cases/FileUseCases");
const { ListAccountsByRole } = require("../../application/use-cases/AccountUseCases");

async function createContribution(req, res, next) {
    //Content
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const contributorId = req.payload.id;
    const contributorFaculty = req.payload.faculty;
    const { title, magazine, agreement } = req.body;
    const { article, pictures } = req.files;
    let files = new Array();
    if (pictures) {
        if (Array.isArray(pictures)){
            files = await Array.from(pictures);
        } else {
            files = new Array(pictures);
        }
    }
    files.push(article);

    ////Check agreement
    if (!agreement) {
        return res.status(200).send({
            exitcode: 1,
            contribution: "",
            message: "Lack of agreement"
        })
    }

    ////Prepare files
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
            const attachedFiles = await UploadFiles(files, contribution, serviceLocator);
            contribution.attach(attachedFiles);
        }
        console.log(contribution);
        if (contribution.files) contribution.files = await serviceLocator.fileSerializer.serialize(contribution.files);
        //Output

        ////Send email
        //////Get coordinator list
/*         const coordinators = await ListAccountsByRole('coordinator', serviceLocator);
        if (coordinators){
            let emailList = []
            await coordinators.forEach(coordinator => {
                if (coordinator.faculty == contributorFaculty) {
                    emailList.push(coordinator.email);
                }
            });
            serviceLocator.mailer.sendMail(emailList, `A student in your faculty has uploaded a new contribution named ${contribution.title}. Check it!`, 'New contribution in your faculty');
        } */

        res.status(200).send({
            exitcode: 0,
            contribution: serviceLocator.contributionSerializer.serialize(contribution),
            message: ''
        })
    } catch (err) {
        console.log('ContributionController::CreateContribution::Err', err);
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

/*     try { */
        //Process
        console.log(id);
        const contribution = await GetContribution(id, serviceLocator);

        if (!contribution) {
            throw new Error('ERR_CONTRIBUTION_NOT_EXISTING');
        }

        const files = await GetFilesByContribution(contribution.id, serviceLocator);
        contribution.attach(files);

        if (contribution.files) contribution.files = serviceLocator.fileSerializer.serialize(contribution.files)

        //Output
        return res.status(200).send({
            exitcode: 0,
            contribution: serviceLocator.contributionSerializer.serialize(contribution),
            message: ''
        })

/*     } catch(err) {
        res.status(500).send({
            exitcode: err.code || 1,
            contribution: {},
            message: err.message || err || 'Unknown'
        })
    } */
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

async function listContributions(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input

    try {
        //Process
        let contributions = await ListContributions(serviceLocator);

        console.log(contributions);
        if (contributions && contributions.length > 0) {
            contributions = await serviceLocator.contributionSerializer.serialize(contributions);
        }

        //Output
        return res.status(200).send({
            exitcode: 0,
            contributions,
            message: ''
        })
    } catch(err) {
        return res.status(500).send({
            exitcode: err.code || 1,
            contributions: [],
            message: err.message || err || 'Unknown'
        })
    }

}

async function listContributionsByAccount(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {accountId} = req.params;

    try {
        //Process
        let contributions = await ListContributionsByAccount(accountId, serviceLocator);

        if (contributions && contributions.length > 0) {
            contributions = await serviceLocator.contributionSerializer.serialize(contributions);
        }

        //Output
        return res.status(200).send({
            exitcode: 0,
            contributions,
            message: ''
        })
    } catch(err) {
        return res.status(500).send({
            exitcode: err.code || 1,
            contributions: [],
            message: err.message || err || 'Unknown'
        })
    }

}

async function listContributionsBySelf(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {id} = req.payload;

    try {
        //Process
        let contributions = await ListContributionsByAccount(id, serviceLocator);

        if (contributions && contributions.length > 0) {
            contributions = await serviceLocator.contributionSerializer.serialize(contributions);
        }

        //Output
        return res.status(200).send({
            exitcode: 0,
            contributions,
            message: ''
        })
    } catch(err) {
        return res.status(500).send({
            exitcode: err.code || 1,
            contributions: [],
            message: err.message || err || 'Unknown'
        })
    }

}

async function SelectContribution(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {contributionId} = req.params;

    try {
        //Process
        let contributions = await SelectContribution(contributionId, serviceLocator);

        if (contributions && contributions.length > 0) {
            contributions = await serviceLocator.contributionSerializer.serialize(contributions);
        }

        //Output
        return res.status(200).send({
            exitcode: 0,
            contributions,
            message: ''
        })
    } catch(err) {
        return res.status(500).send({
            exitcode: err.code || 1,
            contributions: [],
            message: err.message || err || 'Unknown'
        })
    }

}

module.exports = {
    createContribution,
    changeTitle,
    getContribution,
    getContributionByFaculty,
    listContributions,
    listContributionsByAccount,
    listContributionsBySelf
}