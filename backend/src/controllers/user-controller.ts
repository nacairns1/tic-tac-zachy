import nanoid from 'nanoid';
import bcrypt from "bcrypt";
import passport from "passport";

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

export const getAllUsers = (req, res, next) => {
	res.send(dummyUsers);
};

export const getGamesByUser = async (req, res, next) => {
	const username = req.params.username;

	const games = dummyUsers;
	res.send({ games: games });
};

export const registerNewUser = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = { username: username, password: hashedPassword, games: [] };
		dummyUsers.push(user);
		res.redirect(307, './login');
		
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};

export const getUserByUsername = (username:string) => {
	return dummyUsers.find((user) => user.username === username);
};

export const getUserByUserId = (id:string) => {
	return dummyUsers.find((user) => user.username === id);
};

export const loginUser = (req, res, next)=>{
	console.log('attempting log in...');
	if (req.user.username){
		console.log(`${req.user.username} succesful`);
		res.send({user: req.user.username});
	} else {
		console.log('unsuccessful');
		res.status(400).send({message:"error logging in"});
	}
}
