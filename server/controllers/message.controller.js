const logger = require("../configs/logger.config");
const { createMessage, populateMessage, getConvoMessages } = require("../services/message.service");
const { updateLastMessage } = require("../services/conversation.service");

exports.sendMessage = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { message, convoId, files } = req.body;
    if (!convoId || (!message && !files)) {
      logger.error("Invalid data provided");
      return res.sendStatus(400);
    }
    const messageData = {
      sender: userId,
      message,
      conversation: convoId,
      files: files || [],
    };
    // Message data
    let newMessage = await createMessage(messageData);
    // Populate message
    let populatedMessage = await populateMessage(newMessage._id);
    // Update last message
    await updateLastMessage(convoId, newMessage);
    res.json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const { convoId } = req.params;
    if (!convoId) {
      logger.error("Invalid data provided");
      return res.sendStatus(400);
    }
    const messages = await getConvoMessages(convoId);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
