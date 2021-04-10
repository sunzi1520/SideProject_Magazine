'use strict';

const SecuredPasswordManager = require('../../application/security/SecuredPasswordManager');
const Bcrypt = require('bcrypt');

const SALT_ROUNDS = 1024;

module.exports = class extends SecuredPasswordManager {
    async hash(plaintextPassword) {
        return Bcrypt.hashSync(plaintextPassword, SALT_ROUNDS);
    }

    async check(plaintextPassword, hash) {
        return Bcrypt.compareSync(plaintextPassword, hash);
    }
}