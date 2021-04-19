'use strict';

module.exports = {

    async GetAccessToken (email, password, { accountRepository, accessTokenManager, securedPasswordManager }) {
        const account = await accountRepository.getByEmail(email);
        if (!account || !(await securedPasswordManager.check(password, account.password))) {
            throw new Error('Bad credentials');
        }
      
        return accessTokenManager.generate({ id: account.id, role: account.role, faculty: account.faculty, email: account.email });
    },

    VerifyAccessToken (accessToken, { accessTokenManager }) {
        const decoded = accessTokenManager.decode(accessToken);
        if (!decoded) {
            throw {name: 'JsonWebTokenError'};
        }
        return decoded;
    }
}