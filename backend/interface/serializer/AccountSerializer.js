'use strict';

const _serializeSingleAccount = (account) => {
  return {
    'id': account.id,
    'email': account.email,
    'role': account.role,
    'faculty': account.faculty,
    'fullname': account.fullname,
    'gender': account.gender,
    'dob': account.dob,
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