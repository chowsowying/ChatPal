const createHttpError = require("http-errors");
const { UserModel } = require("../models/index");

exports.findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) throw createHttpError.BadRequest("Please fill in all the fields");
  return user;
};

exports.searchUsersByUsername = async (keyword, userId) => {
  const users = await UserModel.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  }).find({ _id: { $ne: userId } });
  if (!users) throw createHttpError.BadRequest("Oops... Something went wrong !");
  return users;
};
