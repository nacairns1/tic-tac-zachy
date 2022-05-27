const nanoid = require("nanoid");
const User = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");
const passport = require("passport");

const dummyUsers = [
	{
		username: "zach zach",
		password: "zachzach",
		games: [],
	},
	{
		username: "noah noah",
		password: "noahnoah",
		games: [],
	},
	{
		username: "zach noah",
		password: "zachnoah",
		games: [],
	},
];

const getAllUsers = (req, res, next) => {
	res.send(dummyUsers);
};

const getGamesByUser = async (req, res, next) => {
	const username = req.params.username;

	const games = dummyUsers;
	res.send({ games: games });
};

const registerNewUser = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = { username: username, password: hashedPassword, games: [] };
		dummyUsers.push(user);
		res.json({ user });
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};

const getUserByUsername = (username) => {
	return dummyUsers.find((user) => user.username === username);
};

const getUserByUserId = (id) => {
	return dummyUsers.find((user) => user.id === id);
};

const loginUser = (req, res, next)=>{

	if (req.user.username){
		res.send({user: req.user.username});
	} else {
		res.status(400).send({message:"error logging in"});
	}
}

module.exports = {
	getAllUsers,
	getUserByUsername,
	getUserByUserId,
	getGamesByUser,
	registerNewUser,
	loginUser,
};
