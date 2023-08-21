const createHttpError = require("http-errors");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/index");

// env variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

exports.createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  // Check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all required fields");
  }

  // Check name length
  if (!validator.isLength(name, { min: 3, max: 30 })) {
    throw createHttpError.BadRequest("Name must be between 3 and 30 characters");
  }

  // Check status length
  if (status && status.length > 100) {
    throw createHttpError.BadRequest("Status must be less than 100 characters");
  }

  // Check if email is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Please enter a valid email");
  }

  // Check if user already exists
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict("User already exists. Please try again with a different email");
  }

  // Check password length
  if (!validator.isLength(password, { min: 6, max: 30 })) {
    throw createHttpError.BadRequest("Password must be between 6 and 30 characters");
  }

  // Hash password --> To be done in user model

  // Create user
  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();

  return user;
};

exports.signInUser = async (userData) => {
  const { email, password } = userData;

  // Find user
  const user = await UserModel.findOne({ email }).lean(); // lean() returns a plain JS object instead of a mongoose object

  // Check if user exists
  if (!user) {
    throw createHttpError.NotFound("User not found. Please try again with a different email");
  }

  // Compare passwords
  let passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw createHttpError.NotFound("Incorrect password. Please try again");
  }

  return user;
};
