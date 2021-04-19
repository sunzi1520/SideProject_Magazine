const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    email: { type: String },
    password: String,
    role: String,
    faculty: String,
    information: {
      fullname: String,
      gender: String,
      dob: Date,
      phone: Number
    }
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema, "Accounts");
module.exports = Account;
