const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const contributionSchema = new Schema(
  {
    contributor: { type: Schema.Types.ObjectId, ref: "Account" },
    magazine: { type: Schema.Types.ObjectId, ref: "Magazine" },
    title: String,
    isSelected: { type: Boolean, default: false}
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
const Contribution = mongoose.model("Contribution", contributionSchema, "Contributions");
module.exports = Contribution;
