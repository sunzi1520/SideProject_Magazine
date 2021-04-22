'use strict';

const { GetReport1 } = require('../../application/use-cases/ReportUseCases');

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

module.exports = {
    getReport1
}