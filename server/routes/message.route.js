const express = require("express");
const router = express.Router();

// Middleware: Remove extra spaces and trim
const trimRequest = require("trim-request");
const trimAll = trimRequest.all;

// Middleware: Authorization
const { authMiddleware } = require("../middlewares/auth.middleware");

// controllers
const { sendMessage, getMessages } = require("../controllers/message.controller");

//routes
router.route("/").post(trimAll, authMiddleware, sendMessage);
router.route("/:convoId").get(trimAll, authMiddleware, getMessages);

module.exports = router;
