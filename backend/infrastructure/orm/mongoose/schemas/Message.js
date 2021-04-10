const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "Account" },
    receiver: { type: Schema.Types.ObjectId, ref: "Account" },
    content: String,
    isRead: { type: Boolean, default: false },
    readAt: Date
  },
  { timestamps: { createdAt: "sentAt" } }
);
const Message = mongoose.model("Message", messageSchema, "Messages");
module.exports = Message;

