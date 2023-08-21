const jwt = require("jsonwebtoken");
const logger = require("../configs/logger.config");

exports.generateToken = async (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(token);
    });
  });
};

exports.verifyToken = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        logger.error(err);
        resolve(null);
      }
      resolve(decoded);
    });
  });
};
