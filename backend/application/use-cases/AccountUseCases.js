'use strict';

const Account = require('../../domain/models/Account');

module.exports = {

    async CreateAccount(email, password, role, faculty, fullname, gender, dob, phone, {securedPasswordManager, accountRepository}) {
        //Check if the email has been used
        const existingAccount = await accountRepository.getByEmail(email);
        if (existingAccount && existingAccount.id) {
            throw new Error("ERR_EMAIL_USED_ALREADY");
        }
        
        const hashedPassword = await securedPasswordManager.hash(password);
        const account = new Account(null, email, hashedPassword, role, faculty, fullname, gender, dob, phone);
        return accountRepository.persist(account);
    },

    async DeleteAccount(accountId, {accountRepository}) {
        const account = await accountRepository.get(accountId);
        if (!account) {
            throw new Error('ERR_ACCOUNT_NOT_EXISTING');
        }
        if (account.role == "admin") {
            const admins = await accountRepository.getByRole("admin");
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
        return accountRepository.getAll();
    },

    async UpdateAccount(id, email, password, role, faculty, fullname, gender, dob, phone, {securedPasswordManager, accountRepository}) {
        const account = await accountRepository.get(id);
        if (!account) {
            throw new Error('Invalid account');
        }
        let hashedPassword = null;
        if (password && !(await securedPasswordManager.check(password, account.password))){
            hashedPassword = await securedPasswordManager.hash(password);
        }
        const newAccount = new Account(null, email, hashedPassword, role, faculty, fullname, gender, dob, phone);
        account.merge(newAccount);
        return accountRepository.merge(account);
    },

    ListAccountsByRole(role, {accountRepository}) {
        return accountRepository.getByRole(role);
    }
}