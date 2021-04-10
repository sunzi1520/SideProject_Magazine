'use strict';

const Account = require('../../domain/models/Account');

module.exports = {

    async CreateAccount(username, password, role, faculty, email, {securedPasswordManager, accountRepository}) {
        const hashedPassword = await securedPasswordManager.hash(password);
        const account = new Account(null, username, hashedPassword, role, faculty, email);
        return accountRepository.persist(account);
    },

    async DeleteAccount(accountId, {accountRepository}) {
        const account = await accountRepository.get(accountId);
        if (!account) {
            throw new Error('ERR_ACCOUNT_NOT_EXISTING');
        }
        if (account.role == "admin") {
            const admins = await accountRepository.findByRole("admin");
            if (admins.length <= 1) {
                throw new Error('ERR_CANNOT_DELETE_ONLY_ADMINISTRATOR');
            }
        }
        return accountRepository.remove(accountId);
    },

    GetAccount(accountId, {accountRepository}) {
        return accountRepository.get(accountId);
    }, 

    ListAccounts({accountRepository}) {
        return accountRepository.find();
    },

    async UpdateAccount(id, username, password, role, faculty, fullname, gender, dob, email, phone, {securedPasswordManager, accountRepository}) {
        const account = await accountRepository.get(id);
        if (!account) {
            throw new Error('Invalid account');
        }
        let hashedPassword = null;
        if (!(await securedPasswordManager.check(password, account.password))){
            hashedPassword = await securedPasswordManager.hash(password);
        }
        if (username && account.username != username) account.username = username;
        if (hashedPassword) account.password = hashedPassword;
        if (role && account.role != role) account.role = role;
        if (faculty && account.faculty != faculty) account.faculty = faculty;
        if (email && account.email != email) account.email = email;
        if (phone && account.phone != phone) account.phone = phone;
        if (fullname && account.fullname != fullname) account.fullname = fullname;
        if (gender && account.gender != gender) account.gender = gender;
        if (dob && account.dob != dob) account.dob = dob;
        return accountRepository.mergeInformation(account);
    }
}