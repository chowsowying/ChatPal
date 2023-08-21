const { MessageModel } = require("../models/index");
const createHttpError = require("http-errors");

exports.createMessage = async (data) => {
  let newMessage = await MessageModel.create(data);
  // Fail to create new message
  if (!newMessage) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return newMessage;
};

exports.populateMessage = async (id) => {
  let message = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name isGroup picture users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });
  // If message not found
  if (!message) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return message;
};

exports.getConvoMessages = async (id) => {
  const messages = await MessageModel.find({ conversation: id })
    .populate("sender", "name picture email status")
    .populate("conversation");
  // If message not found
  if (!messages) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return messages;
};
