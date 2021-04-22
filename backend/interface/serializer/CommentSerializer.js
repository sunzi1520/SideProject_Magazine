'use strict';

const _serializeSingleComment = (comment) => {
  return {
    'id': comment.id,
    'commenterId': comment.createdBy.id,
    'commenterName': comment.createdBy.fullname,
    'commenterEmail': comment.createdBy.email,
    'contributionId': comment.contribution.id,
    'contributionTitle': comment.contribution.title,
    'content': comment.content,
    'createdAt': comment.createdAt,
    'updatedAt': comment.updatedAt
  };
};

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleComment);
    }
    return _serializeSingleComment(data);
  }

};