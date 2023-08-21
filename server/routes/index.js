const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.route");
const conversationRoutes = require("./conversation.route");
const MessageRoutes = require("./message.route");
const UserRoutes = require("./user.route");

router.use("/auth", authRoutes);
router.use("/conversation", conversationRoutes);
router.use("/message", MessageRoutes);
router.use("/user", UserRoutes);

module.exports = router;
