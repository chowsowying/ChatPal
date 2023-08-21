const express = require("express");
const router = express.Router();

// Middleware: Remove extra spaces and trim
const trimRequest = require("trim-request");
const trimAll = trimRequest.all;

// Middleware: Authorization
const { authMiddleware } = require("../middlewares/auth.middleware");

// controllers
const { searchUsers } = require("../controllers/user.controller");

//routes
router.route("/").get(trimAll, authMiddleware, searchUsers);

module.exports = router;
