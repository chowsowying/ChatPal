const express = require("express");
const router = express.Router();

// Middleware: Remove extra spaces and trim
const trimRequest = require("trim-request");
const trimAll = trimRequest.all;

// controllers
const { register, login, logout, refreshToken } = require("../controllers/auth.controller");

//routes
router.route("/register").post(trimAll, register);
router.route("/login").post(trimAll, login);
router.route("/logout").post(trimAll, logout);
router.route("/refreshtoken").post(trimAll, refreshToken);

module.exports = router;
