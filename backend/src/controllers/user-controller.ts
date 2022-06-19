import nanoid from "nanoid";
import bcrypt from "bcrypt";
import passport, { use } from "passport";
import { RequestHandler } from "express";

import { Game, PlayerEntry, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers: RequestHandler = (req, res, next) => {
	res.send();
};

export const getGamesByUser: RequestHandler = async (req, res, next) => {
	const username = req.params.username;
	console.log(req.body);
	if (username == null) {
		res.status(400).send({message: "No user found."});
		return;
	}
	let games: (Game | null)[];
	let updatedGames;
	try {
		let user = await prisma.user.findUnique({ where: { username: username } });

		if (user === null) {
			res.status(400).send({ message: "No user found!" });
			console.log("no user found");
			return;
		}

		let playerEntries = await prisma.playerEntry.findMany({
			where: { userId: user.id },
		});
		if (playerEntries === null) {
			res.status(400).send({ message: "No games found!" });
			console.log("no game found");
			return;
		}

		let gameFetchPromises = playerEntries.map((pE) =>
			prisma.game.findUnique({ where: { id: pE.gameId } })
		);

		let gamesFromDB = await prisma.$transaction(gameFetchPromises);

		gamesFromDB = gamesFromDB.filter((result) => result !== null);
		let playersPromises = gamesFromDB.map((game) =>
			prisma.playerEntry.findMany({ where: { gameId: game?.id } })
		);

		let playerEntryFetch = await prisma.$transaction(playersPromises);

		let players_users_fetch = playerEntryFetch.map((entry)=> entry.map(rawPlayer => prisma.user.findUnique({where: {id: rawPlayer.userId}})));
		let usersFromDB = await prisma.$transaction(players_users_fetch.flat(1));

		let updatedPlayerEntries = playerEntryFetch.map((pair) => {
			return pair.map((playerEntry)=> {
				let username = usersFromDB.find(user => user?.id === playerEntry.userId)?.username;
				return {...playerEntry, username}
			})
		});

		updatedGames = gamesFromDB.map((game, index) => {
			return {...game, players: updatedPlayerEntries.find((pair) => pair.find(stored_game => stored_game.gameId === game?.id))}
		})
		games = gamesFromDB;
	} catch (e) {
		console.error(e);
		games = [];
	}
	if (updatedGames === undefined) {
		console.error('error detected');
		return;
	}
	res.send({ games: updatedGames });
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
			console.log(`${dbUser.username} registered successfully`);
		 	res.redirect("/users/login", 307);
			return;
		} catch (e) {
			console.error(e);
		}
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};

export const getUserByUsername = async (username: string) => {
	const user = await prisma.user.findUnique({ where: { username } });

	return user;
};

interface UserInSession extends Express.User {
	username?: string;
}

export const loginUser: RequestHandler = (req, res, next) => {
	console.log("attempting log in...");
	if (req.user === undefined) return res.status(400).send({ message: "error" });
	const user: UserInSession = req.user;
	if (user.username !== undefined) {
		console.log(`${user.username} succesful`);
		res.send({ user: user.username });
	} else {
		console.log("unsuccessful");
		res.status(400).send({ message: "error logging in" });
	}
};
