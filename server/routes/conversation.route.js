const express = require("express");
const router = express.Router();

// Middleware: Remove extra spaces and trim
const trimRequest = require("trim-request");
const trimAll = trimRequest.all;

// Middleware: Authorization
const { authMiddleware } = require("../middlewares/auth.middleware");

// controllers
const {
  create_open_Conversation,
  getConversations,
} = require("../controllers/conversation.controller");

//routes
router.route("/").post(trimAll, authMiddleware, create_open_Conversation);
router.route("/").get(trimAll, authMiddleware, getConversations);

module.exports = router;
