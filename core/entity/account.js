/*
    Created by Nguyen Thanh Long @ Group 4 on 28 Feb, 2021
    Last updated by Thai Duong Bao Duy @ Group 4 on 08 March, 2021
*/

'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    username: String,
    password: String,
    status: String,
    role: { title: String },
    information: {
      firstname: String,
      middlename: String,
      lastname: String,
      email: String,
      phone: Number,
    },
    faculty: { name: String },
  },
  { timestamps: true }
);

const Account = mongoose.model("Accounts", accountSchema);
module.exports = Account;
