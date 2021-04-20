'use strict';

const _serializeSingleContribution = (contribution) => {
  return {
    'id': contribution.id,
    'title': contribution.title,
    'magazineId': contribution.magazine.id,
    'magazineName': contribution.magazine.name,
    'magazineYear': contribution.magazine.published_year,
    'contributorId': contribution.contributor.id,
    'contributorEmail': contribution.contributor.email,
    'contributorFaculty': contribution.contributor.faculty,
    'contributorName': contribution.contributor.fullname,
    'isSelected': contribution.isSelected,
    'files': contribution.files,
    'createdAt': contribution.createdAt,
    'updatedAt': contribution.updatedAt
  };
};

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleContribution);
    }
    return _serializeSingleContribution(data);
  }

};