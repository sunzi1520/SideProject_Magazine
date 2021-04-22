'use strict';

const Report = require('../../domain/models/Report');
const MongooseMagazine = require('../orm/mongoose/schemas/Magazine');

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
      const mongooseReport = await MongooseMagazine.aggregate([
        {
          '$match': {
            'published_year': parseInt(year)
          }
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
      let query = {'_id': parseInt(year)};
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

}