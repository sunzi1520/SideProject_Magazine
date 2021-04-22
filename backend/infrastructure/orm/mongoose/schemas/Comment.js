const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "Account" },
    contribution: {type: Schema.Types.ObjectId, ref: "Contribution"},
    content: {type: String}
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema, "Comments");
module.exports = Comment;
