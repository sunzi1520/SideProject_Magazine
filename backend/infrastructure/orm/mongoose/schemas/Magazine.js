const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const magazineSchema = new Schema(
  {
    manager: { type: Schema.Types.ObjectId, ref: "Account" },
    name: String,
    published_year: Number,
    closureDate: Date,
    finalClosureDate: Date,
  },
  {
    timestamps: true
  }
);
const Magazine = mongoose.model("Magazine", magazineSchema, "Magazines");
module.exports = Magazine;
