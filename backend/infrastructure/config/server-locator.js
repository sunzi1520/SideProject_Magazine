'use strict';

const constants = require('./constants');
const environment = require('./environment');
//General Services
//// Secured Password Manager
const BcryptSecuredPasswordManager = require('../security/bcryptSecuredPasswordManager');
//// Access Token Manager
const JwtAccessTokenManager = require('../security/jwtAccessTokenManager');
//// Mailer
const NodemailerMailer = require('../notification/NodemailerMailer');
//// Serializer
const AccountSerializer = require('../../interface/serializer/AccountSerializer');

function buildBeans() {

  const beans = {
    securedPasswordManager: new BcryptSecuredPasswordManager(),
    accessTokenManager: new JwtAccessTokenManager(),
    accountSerializer: new AccountSerializer(),
    mailer: new NodemailerMailer()
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY.DIALECT) {
    throw new Error('Add in-memory support');
  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO.DIALECT) {
    const AccountRepositoryMongo = require('../repositories/AccountRepositoryMongo');
    const MagazineRepositoryMongo = require('../repositories/MagazineRepositoryMongo');
    const CommentRepositoryMongo = require('../repositories/CommentRepositoryMongo');
    const ContributionRepositoryMongo = require('../repositories/ContributionRepositoryMongo');
    const FileRepositoryMongo = require('../repositories/FileRepositoryMongo');
    const MessageRepositoryMongo = require('../repositories/MessageRepositoryMongo');

    beans.accountRepository = new AccountRepositoryMongo();
    beans.magazineRepository = new MagazineRepositoryMongo();
    beans.commentRepository = new CommentRepositoryMongo();
    beans.contributionRepository = new ContributionRepositoryMongo();
    beans.fileRepository = new FileRepositoryMongo();
    beans.messageRepository = new MessageRepositoryMongo();
  } else {
    throw new Error('Add SQL support');
  }

  return beans;
}

module.exports = buildBeans();
