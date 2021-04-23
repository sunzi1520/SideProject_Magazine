'use strict';

const Report = require('../../domain/models/Report');
const Account = require('../../domain/models/Account');
const Magazine = require('../../domain/models/Magazine');
const Contribution = require('../../domain/models/Contribution');
const MongooseMagazine = require('../orm/mongoose/schemas/Magazine');
const MongooseContribution = require('../orm/mongoose/schemas/Contribution');

module.exports = class {
    
    async GetReport1() {
        const mongooseReport = await MongooseMagazine.aggregate([
            {
              '$lookup': {
                'from': 'Contributions', 
                'let': {
                  'magazine': '$_id'
                }, 
                'pipeline': [
                  {
                    '$match': {
                      '$expr': {
                        '$eq': [
                          '$magazine', '$$magazine'
                        ]
                      }
                    }
                  }, {
                    '$lookup': {
                      'from': 'Accounts', 
                      'localField': 'contributor', 
                      'foreignField': '_id', 
                      'as': 'contributor'
                    }
                  }, {
                    '$unwind': {
                      'path': '$contributor'
                    }
                  }, {
                    '$group': {
                      '_id': '$contributor.faculty', 
                      'numOfContributions': {
                        '$sum': 1
                      }
                    }
                  }
                ], 
                'as': 'contributions'
              }
            }, {
              '$unwind': {
                'path': '$contributions', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$group': {
                '_id': {
                  'year': '$published_year', 
                  'faculty': '$contributions._id'
                }, 
                'numOfContributions': {
                  '$sum': '$contributions.numOfContributions'
                }
              }
            }, {
              '$group': {
                '_id': '$_id.year', 
                'statistics': {
                  '$push': {
                    'faculty': '$_id.faculty', 
                    'numOfContributions': '$numOfContributions'
                  }
                }
              }
            },
            {
              '$sort': {
                '_id': -1
              }
            }
          ]).exec();
        const reportForm = new Report();
        for (let item of mongooseReport) {
          const addLabel = await reportForm.AddLabel(item._id);
          if (!addLabel) continue;
          for (let metric of item.statistics) {
            await reportForm.AddDataset(metric.faculty, metric.numOfContributions);
          }
          await reportForm.Normalize();
        }
        return reportForm;
    }

    async GetReport2(year) {
      const query = {
        'published_year': year && parseInt(year)
      }
      await Object.keys(query).forEach(k => query[k] === undefined && delete query[k]);
      const mongooseReport = await MongooseMagazine.aggregate([
        {
          '$match': query
        }, {
          '$lookup': {
            'from': 'Contributions', 
            'let': {
              'magazine': '$_id'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$magazine', '$$magazine'
                    ]
                  }
                }
              }, {
                '$lookup': {
                  'from': 'Accounts', 
                  'localField': 'contributor', 
                  'foreignField': '_id', 
                  'as': 'contributor'
                }
              }, {
                '$unwind': {
                  'path': '$contributor'
                }
              }, {
                '$group': {
                  '_id': '$contributor.faculty', 
                  'numOfContributions': {
                    '$sum': 1
                  }
                }
              }
            ], 
            'as': 'contributions'
          }
        }, {
          '$unwind': {
            'path': '$contributions', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$group': {
            '_id': {
              'year': '$published_year', 
              'faculty': '$contributions._id'
            }, 
            'numOfContributions': {
              '$sum': '$contributions.numOfContributions'
            }
          }
        }, {
          '$group': {
            '_id': '$_id.year', 
            'statistics': {
              '$push': {
                'faculty': '$_id.faculty', 
                'numOfContributions': '$numOfContributions'
              }
            }, 
            'total': {
              '$sum': '$numOfContributions'
            }
          }
        }
      ]).exec();
      console.log(mongooseReport);
      const reportForm = new Report();
      for (let item of mongooseReport[0].statistics) {
        console.log(item);
        const addLabel = await reportForm.AddLabel(item.faculty)
        if (!addLabel) continue;
        await reportForm.AddDataset('Contributions', item.numOfContributions);
        await reportForm.Normalize();
      }
      return reportForm;
    }

    async GetReport3(year = undefined) {
      let query = {'_id': year && parseInt(year)};
      await Object.keys(query).forEach(k => query[k] === undefined && delete query[k]);
      const mongooseReport = await MongooseMagazine.aggregate([
        {
          '$lookup': {
            'from': 'Contributions', 
            'let': {
              'magazine': '$_id'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$magazine', '$$magazine'
                    ]
                  }
                }
              }, {
                '$lookup': {
                  'from': 'Accounts', 
                  'localField': 'contributor', 
                  'foreignField': '_id', 
                  'as': 'contributor'
                }
              }, {
                '$unwind': {
                  'path': '$contributor'
                }
              }, {
                '$group': {
                  '_id': {
                    'contributor': '$contributor._id', 
                    'faculty': '$contributor.faculty'
                  }, 
                  'numOfContributions': {
                    '$sum': 1
                  }
                }
              }, {
                '$group': {
                  '_id': '$_id.faculty', 
                  'numOfContributors': {
                    '$sum': 1
                  }
                }
              }
            ], 
            'as': 'contributions'
          }
        }, {
          '$unwind': {
            'path': '$contributions', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$group': {
            '_id': {
              'year': '$published_year', 
              'faculty': '$contributions._id'
            }, 
            'numOfContributors': {
              '$sum': '$contributions.numOfContributors'
            }
          }
        }, {
          '$group': {
            '_id': '$_id.year', 
            'statistics': {
              '$push': {
                'faculty': '$_id.faculty', 
                'numOfContributors': '$numOfContributors'
              }
            },
            'total': {'$sum': '$numOfContributors'}
          }
        }, {
          '$sort': {'total': -1}
        }, {
          '$match': query
        }
      ]).exec();
      console.log(mongooseReport);
      const reportForm = new Report();
      for (let item of mongooseReport) {
        console.log(item);
        const addLabel = await reportForm.AddLabel(item._id);
        if (!addLabel) continue;
        for (let metric of item.statistics) {
          console.log(metric);
          await reportForm.AddDataset(metric.faculty, metric.numOfContributors);
        }
        console.log('Report Form::', reportForm);
        await reportForm.Normalize();
      }
      return reportForm;
    }

    async getCommentReport(year= undefined, faculty = undefined, outOf14 = undefined) {
      let query = {'contributor.faculty': faculty, 'magazine.published_year': year && parseInt(year)};
      let spQuery = {'$match': {}};
      if (outOf14) spQuery['$match'] = {
        '$expr': {
          '$lt': [
            '$createdAt', {
              '$subtract': [
                '$oldest.oldest', 1000 * 60 * 60 * 24 * 14
              ]
            }
          ]
        } 
      };
      await Object.keys(query).forEach(k => query[k] === undefined && delete query[k]);
      const mongooseReport = await MongooseContribution.aggregate([
        {
          '$lookup': {
            'from': 'Accounts', 
            'localField': 'contributor', 
            'foreignField': '_id', 
            'as': 'contributor'
          }
        }, {
          '$unwind': {
            'path': '$contributor'
          }
        }, {
          '$lookup': {
            'from': 'Magazines', 
            'localField': 'magazine', 
            'foreignField': '_id', 
            'as': 'magazine'
          }
        }, {
          '$unwind': {
            'path': '$magazine'
          }
        }, {
          '$lookup': {
            'from': 'Comments', 
            'let': {
              'contribution': '$_id'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$contribution', '$$contribution'
                    ]
                  }
                }
              }, {
                '$lookup': {
                  'from': 'Accounts', 
                  'localField': 'createdBy', 
                  'foreignField': '_id', 
                  'as': 'createdBy'
                }
              }, {
                '$unwind': '$createdBy'
              }, {
                '$group': {
                  '_id': '$createdBy.role', 
                  'oldest': {
                    '$min': '$createdAt'
                  }
                }
              }, {
                '$match': {
                  '$expr': {
                    '$in': [
                      '$_id', [
                        'coordinator', 'manager', 'admin'
                      ]
                    ]
                  }
                }
              }, {
                '$sort': {
                  'oldest': 1
                }
              }
            ], 
            'as': 'comments'
          }
        }, {
          '$addFields': {
            'numOfComments': {
              '$size': '$comments'
            }, 
            'oldest': {
              '$arrayElemAt': [
                '$comments', 0
              ]
            }
          }
        }, {
          '$match': {
            '$expr': {
              '$eq': [
                '$numOfComments', 0
              ]
            }
          }
        }, {
          '$match': query
        }, spQuery
      ]).exec();
      return mongooseReport.map((mongooseContribution) => {
          const contributor = new Account(mongooseContribution.contributor._id.toString(), mongooseContribution.contributor.email, mongooseContribution.contributor.password, mongooseContribution.contributor.role, mongooseContribution.contributor.faculty, mongooseContribution.contributor.information.fullname, mongooseContribution.contributor.gender, mongooseContribution.contributor.dob, mongooseContribution.contributor.phone, mongooseContribution.contributor.createdAt, mongooseContribution.contributor.updatedAt);
          const magazine = new Magazine(mongooseContribution.magazine._id.toString(), mongooseContribution.magazine.manager, mongooseContribution.magazine.name, mongooseContribution.magazine.closureDate, mongooseContribution.magazine.finalClosureDate, mongooseContribution.magazine.coordinators, mongooseContribution.magazine.published_year, mongooseContribution.magazine.isLocked, mongooseContribution.magazine.createdAt, mongooseContribution.magazine.updatedAt);
          return new Contribution(mongooseContribution._id, contributor, magazine, mongooseContribution.title, mongooseContribution.isSelected, mongooseContribution.createdAt, mongooseContribution.updateAt);
      });
    }
}