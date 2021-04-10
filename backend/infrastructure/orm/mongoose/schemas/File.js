const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    contribution_id: { type: Schema.Types.ObjectId, ref: "Contribution" },
    path: String,
  }, 
  {
    timestamps: true
  });
const File = mongoose.model("File", fileSchema, "Files");
module.exports = File;
