require("dotenv").config();
import express from 'express';
import passport from 'passport';

import { getAllUsers, registerNewUser, getGamesByUser, loginUser } from "../controllers/user-controller";

const router = express.Router();

router.get("/games", getGamesByUser);

router.post("/register", registerNewUser);

router.post("/login", passport.authenticate("local", {}), loginUser);

router.get("/", getAllUsers);

export default router;
