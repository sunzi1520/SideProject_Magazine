'use strict';

const mongoose = require('mongoose');
const environment = require('../../config/environment');

mongoose.connect(environment.database.uri, 
  {
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     useFindAndModify: false
  })

const db = mongoose.connection;
db.on('error', (err) => {
  console.log('Connection error: ' + err);
})
db.once('open', () => {
  console.log('Connected to MongoDB database!');

});

module.exports = mongoose;