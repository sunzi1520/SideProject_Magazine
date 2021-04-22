'use strict';

function GetReport1({reportRepository}) {
    return reportRepository.GetReport1();
}

function GetReport2(publised_year, {reportRepository}) {
    return reportRepository.GetReport2(publised_year);
}

function GetReport3(publised_year, {reportRepository}) {
    return reportRepository.GetReport3(publised_year);
}

module.exports = {
    GetReport1,
    GetReport2,
    GetReport3
}