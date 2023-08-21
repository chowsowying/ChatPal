const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  // check if token exists
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized());
  }

  // Get token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  // Verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next(createHttpError.Unauthorized());
    }

    req.user = decoded;
    next();
  });
};
