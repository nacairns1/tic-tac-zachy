require("dotenv").config();
import express from 'express';
import passport from 'passport';

import { getAllUsers, registerNewUser, getGamesByUser, loginUser } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:username", getGamesByUser);

router.post("/register", registerNewUser);

router.post("/login", passport.authenticate("local", {}), loginUser);

module.exports = router;
