'use strict';

const _serializeSingleAccount = (account) => {
  return {
    'id': account.id,
    'username': account.username,
    'role': account.role,
    'faculty': account.faculty,
    'isActive': account.isActive,
    'lastAccess': account.lastAccess,
    'fullname': account.fullname,
    'gender': account.gender,
    'dob': account.dob,
    'email': account.email,
    'phone': account.phone,
    'createdAt': account.createdAt
  };
};

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleAccount);
    }
    return _serializeSingleAccount(data);
  }

};