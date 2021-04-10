const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    username: { type: String },
    password: String,
    role: String,
    faculty: String,
    isActive: { type: Boolean, default: false },
    lastAccess: Date,
    security: {
      series: String,
      token: String
    },
    information: {
      fullname: String,
      gender: String,
      dob: Date,
      email: { type: String },
      phone: Number
    }
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema, "Accounts");
module.exports = Account;
