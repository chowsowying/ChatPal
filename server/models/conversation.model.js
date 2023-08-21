const mongoose = require("mongoose");
const validator = require("validator");

const conversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name for the conversation"],
      trim: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    collection: "conversations",
    timestamps: true,
  }
);

const ConversationModel =
  mongoose.models.ConversationModel || mongoose.model("ConversationModel", conversationSchema);

module.exports = ConversationModel;
