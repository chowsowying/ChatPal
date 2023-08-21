const logger = require("../configs/logger.config");
const createHttpError = require("http-errors");
const {
  doesConvoExist,
  createConversation,
  populateConveresation,
  getUserConversations,
} = require("../services/conversation.service");
const { findUser } = require("../services/user.service");
exports.create_open_Conversation = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const { recieverId } = req.body;

    // Check if receiver_id is valid
    if (!recieverId) {
      logger.error("Receiver id is required");
      throw createHttpError.BadRequest("Oops... Something went wrong");
    }

    // Check if conversation already exists
    const convoExists = await doesConvoExist(senderId, recieverId);

    if (convoExists) {
      // If conversation exists, send the conversation
      res.json(convoExists);
    } else {
      // If conversation does not exist, create a new conversation
      // Get receiver details
      // const receiverDetails = await findUser(recieverId);
      let convoData = {
        name: "Conversation Name",
        picture: "Conversation Picture",
        isGroup: false,
        users: [senderId, recieverId],
      };
      // Create new conversation
      const newConvo = await createConversation(convoData);
      // populate the conversation with user details
      const populatedConvo = await populateConveresation(newConvo._id, "users", "-password");
      res.status(200).json(populatedConvo);
    }
  } catch (error) {
    next(error);
  }
};

exports.getConversations = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const conversations = await getUserConversations(userId);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
