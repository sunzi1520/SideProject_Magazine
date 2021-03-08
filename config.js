/*
    Created by Thai Duong Bao Duy @ Group 4 on 01 March, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

const DEV_TYPE = 0;

switch (DEV_TYPE) {
    case 0:
        exports.server = {
            port: process.env.PORT || 3000,
            noTokenUrls: ['/account/login']
        }
        break;
    default:
        break;
}