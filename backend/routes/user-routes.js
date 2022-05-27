require("dotenv").config();
const express = require("express");
const passport = require('passport');

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

router.post("/login", passport.authenticate("local"), loginUser);

module.exports = router;
