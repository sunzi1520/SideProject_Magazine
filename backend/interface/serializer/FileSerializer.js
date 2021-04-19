'use strict';

const _serializeSingleFile = (file) => {
  return {
    'id': file.id,
    'filename': file.filename,
    'filetype': file.filetype,
    'createdAt': file.createdAt
  };
};

const _serializeSingleFileWContribution = (file) => {
  return {
    'id': file.id,
    'contributionId': file.contribution.id,
    'contributionTitle': file.contribution.title,
    'filename': file.filename,
    'filetype': file.filetype,
    'createdAt': file.createdAt
  };
};

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleFile);
    }
    return _serializeSingleFile(data);
  }

  serializeWContribution(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleFileWContribution);
    }
    return _serializeSingleFileWContribution(data);
  }

};