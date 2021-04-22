'use strict';

const { GetReport1, GetReport2, GetReport3, GetReport4 } = require('../../application/use-cases/ReportUseCases');

async function getReport1(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input

    try {
        const reportData = await GetReport1(serviceLocator);

        console.log(reportData);
        return res.status(200).send(reportData);

    } catch (err) {
        return res.status(500).send({
            exitcode: err.code || 1,
            reportData: {},
            message: err.message || err || 'Unknown'
        })
    }
}

async function getReport2(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {year} = req.params;

    try {
        const reportData = await GetReport2(year, serviceLocator);

        console.log(reportData);
        return res.status(200).send(reportData);

    } catch (err) {
        return res.status(500).send({
            exitcode: err.code || 1,
            reportData: {},
            message: err.message || err || 'Unknown'
        })
    }
}

async function getReport3(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const {year} = req.params;

    try {
        const reportData = await GetReport3(year, serviceLocator);

        console.log(reportData);
        return res.status(200).send(reportData);

    } catch (err) {
        return res.status(500).send({
            exitcode: err.code || 1,
            reportData: {},
            message: err.message || err || 'Unknown'
        })
    }
}

async function getReport4(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const { year, faculty, over14 } = req.params;

    try {
        //Process
        const contributions = await GetReport4(year, faculty, over14, serviceLocator);

        //Output
        return res.status(200).send({
            exitcode: 0,
            contributions: serviceLocator.contributionSerializer.serialize(contributions),
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
    getReport1,
    getReport2,
    getReport3,
    getReport4
}