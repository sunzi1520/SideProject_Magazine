const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    contribution: { type: Schema.Types.ObjectId, ref: "Contribution" },
    filename: String,
    path: String,
    filetype: String
  }, 
  {
    timestamps: true
  });
const File = mongoose.model("File", fileSchema, "Files");
module.exports = File;
