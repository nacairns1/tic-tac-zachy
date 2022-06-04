const express = require("express");
const gameRoutes = require("./routes/game-routes");
const userRoutes = require("./routes/user-routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const initializePassport = require("./passport-config");

const {getUserByUsername, getUserByUserId} = require('./controllers/user-controller');

require("dotenv").config();

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

try {
	mongoose.connect(process.env.MONGODB_URL);
	console.log("connected to mongoose");
} catch {
	throw console.error();
}

app.use("/tic-tac-toe", gameRoutes);

app.use("/users", userRoutes);
