const createHttpError = require("http-errors");
const { ConversationModel, UserModel } = require("../models/index");

exports.doesConvoExist = async (senderId, receiverId) => {
  let convos = await ConversationModel.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: senderId } } },
      { users: { $elemMatch: { $eq: receiverId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  // No conversation found
  if (!convos) throw createHttpError.BadRequest("Oops... Something went wrong !");

  // Populate message model
  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "-password",
  });

  return convos[0];
};

exports.createConversation = async (convoData) => {
  const newConvo = await ConversationModel.create(convoData);
  if (!newConvo) throw createHttpError.BadRequest("Oops... Something went wrong !");
  return newConvo;
};

exports.populateConveresation = async (id, fieldsToPopulate, fieldsToRemove) => {
  const populatedConvo = await ConversationModel.findOne({ _id: id }).populate(
    fieldsToPopulate,
    fieldsToRemove
  );
  if (!populatedConvo) throw createHttpError.BadRequest("Oops... Something went wrong !");
  return populatedConvo;
};

exports.getUserConversations = async (userId) => {
  let conversations;
  await ConversationModel.find({
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "-password",
      });
      conversations = results;
    })
    .catch((err) => {
      console.log(err);
      throw createHttpError.BadRequest("Oops... Something went wrong !");
    });
  return conversations;
};

exports.updateLastMessage = async (convoId, message) => {
  const updatedConvo = await ConversationModel.findOneAndUpdate(
    { _id: convoId },
    { latestMessage: message }
  );
  if (!updatedConvo) throw createHttpError.BadRequest("Oops... Something went wrong !");
  return updatedConvo;
};
