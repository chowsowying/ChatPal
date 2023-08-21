const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");
const { searchUsersByUsername } = require("../services/user.service");

exports.searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    if (!keyword) {
      logger.error("No keyword provided");
      throw createHttpError.BadRequest("Oops... Something went wrong !");
    }
    const users = await searchUsersByUsername(keyword, req.user.userId);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
