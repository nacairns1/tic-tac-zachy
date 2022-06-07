import express from "express";
import gameRoutes from "./routes/game-routes";
import userRoutes from "./routes/user-routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";




import {initializePassport} from "./passport-config";

import { getUserByUsername, getUserByUserId } from './controllers/user-controller';

require("dotenv").config();
const secret = process.env.SESSION_SECRET;
if (secret === undefined) {
	console.error('No secret key found.')
	
}


initializePassport(
	passport,
	getUserByUsername,
	getUserByUserId
);

const port = 5000;
const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
	console.log("backend up and running");
});

app.use("/tic-tac-toe", gameRoutes);

app.use("/users", userRoutes);
