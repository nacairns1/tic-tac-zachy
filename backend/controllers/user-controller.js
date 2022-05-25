const nanoid = require("nanoid");
const User = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");

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

const loginUser = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	const user = dummyUsers.find((user) => user.username === username);

	if (user === undefined) {
		res.status(401).send({ message: "failed login" });
	}

	try {
		const result = await bcrypt.compare(password, user.password);
		if (result) {
			res.status(200).send({ user });
		} else {
			res.status(401).send({ message: "failed login" });
		}
	} catch (err) {
		res.status(500).send();
	}
};

module.exports = { getAllUsers, getGamesByUser, registerNewUser, loginUser };
