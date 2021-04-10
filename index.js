'use strict';

const Bootstrap = require('./backend/infrastructure/config/bootstrap');
const CreateServer = require('./backend/infrastructure/webserver/server');

async function start() {
    try {
        const {orm} = await Bootstrap.init();
        const server = await CreateServer();
        orm.connection.once('open', () => {
            server.emit('ready');
        })
    } catch (err) {
        console.log('Runtime error: ' + err);
        process.exit(1);
    }
}

start();