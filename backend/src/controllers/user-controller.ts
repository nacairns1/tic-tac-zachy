import nanoid from "nanoid";
import bcrypt from "bcrypt";
import passport from "passport";
import { RequestHandler } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export const getAllUsers: RequestHandler = (req, res, next) => {
	res.send(dummyUsers);
};

export const getGamesByUser: RequestHandler = async (req, res, next) => {
	const username = req.body.username;

	const games = await prisma.playerEntry.findMany({ where: username });

	if (games === null) {
		return next(new Error("no games found"));
	}

	res.send({ games: games });
};

export const registerNewUser: RequestHandler = async (req, res, next) => {
	const username: string = req.body.username;
	const password: string = req.body.password;

	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = { username: username, password: hashedPassword };
		try {
			const dbUser = await prisma.user.create({ data: user });
			return res.redirect('/login', 307);
		} catch (e) {
			console.error(e);
		}
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};

export const getUserByUsername = async (username: string) => {
	const user = await prisma.user.findUnique({where: {username}})

	return user;
};

export const getUserByUserId = (id: string) => {
	return dummyUsers.find((user) => user.username === id);
};

export const loginUser: RequestHandler = (req, res, next) => {
	console.log("attempting log in...");
	if (req.user === undefined) return res.status(400).send({ message: "error" });
	const user = req.user;
	if (user.username) {
		console.log(`${req.user.username} succesful`);
		res.send({ user: req.user.username });
	} else {
		console.log("unsuccessful");
		res.status(400).send({ message: "error logging in" });
	}
};
