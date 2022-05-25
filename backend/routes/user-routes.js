require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const nanoid = require("nanoid");

const {
	getAllUsers,
	registerNewUser,
	getGamesByUser,
	loginUser,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:username", getGamesByUser);

router.post("/register", registerNewUser);

router.post("/login", loginUser);

module.exports = router;
