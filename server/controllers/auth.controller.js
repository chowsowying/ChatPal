const { createUser, signInUser } = require("../services/auth.service");
const { findUser } = require("../services/user.service");
const createHttpError = require("http-errors");
const { generateToken, verifyToken } = require("../services/token.service");

exports.register = async (req, res, next) => {
  try {
    // Get user input from request body
    const { name, email, picture, status, password } = req.body;
    // Validate user input and create user if valid
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });

    // Create token
    const access_token = await generateToken(
      { userId: newUser._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: newUser._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    // Store refresh token in cookie
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Send response
    res.json({
      message: "Register Success.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Get user input from request body
    const { email, password } = req.body;
    // Validate user input and signin user if valid
    const user = await signInUser({ email, password });

    // Create token
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    // Store refresh token in cookie
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Send response
    res.json({
      message: "You're successfully login.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/v1/auth/refreshtoken" });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// Generate new access token using refresh token
exports.refreshToken = async (req, res, next) => {
  try {
    // Check if refresh token exists
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token) {
      throw createHttpError.Unauthorized("Please login to continue");
    }

    // Verify refresh token
    const check = await verifyToken(refresh_token, process.env.REFRESH_TOKEN_SECRET);

    // Find user by id
    const user = await findUser(check.userId);

    // Create token
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
