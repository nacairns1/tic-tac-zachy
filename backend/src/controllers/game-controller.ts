import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { TTTQueue } from "../user-queue/ttt-queue";
import { Game } from "@prisma/client";
import { User } from "@prisma/client";

const nanoid = require("nanoid");

const prisma = new PrismaClient();

const playerQueue = new TTTQueue();

//all functions for /tic-tac-toe

// function for GET / path

export const getAllGames: RequestHandler = (req, res, next) => {
	// res.send({ games: TTT_GAMES });
};

// function for GET /:id path
export const getGameById: RequestHandler = (req, res, next) => {
	const id = req.params.id;
	// const game = TTT_GAMES.find((game) => game.id === id);
	// res.send({ game: game });
};

export const createNewGame: RequestHandler = (req, res, next) => {
	const uniqueGameId = nanoid.nanoid();
	const player_X = req.body.player_X;
	const player_O = req.body.player_O;

	const gameToAdd = {
		gameId: uniqueGameId,
		game: [0, 0, 0, 0, 0, 0, 0, 0, 0],
		players: [
			{
				playerId: player_X,
				piece: "x",
			},
			{
				playerId: player_O,
				piece: "o",
			},
		],
	};

	res.send({ gameToAdd: gameToAdd });
};

export const editGameByGameId: RequestHandler = (req, res, next) => {
	const gameId = req.params.gameId;
	const newGameState = req.body.game;

	const gameFromDatabase = TTT_GAMES.find((game) => game.id === gameId);
	if (gameFromDatabase === undefined) return res.send({message: "no game found"});
	
	gameFromDatabase.game = newGameState;

	res.send({ game: gameFromDatabase });
};

export const deleteGameByGameId: RequestHandler = (req, res, next) => {
	res.send({ message: "deleted!" });
};

export const joinGameQueue: RequestHandler = async (req, res, next) => {
	const new_user = req.body.username;
	if (playerQueue.length() > 0) {
		let newGame = await startNewRandomGame(new_user);
		res.send({gameId: newGame});

		return;
	}
	
	let user = await prisma.user.findUnique({where:{username: new_user.username}});
	if (user === null) {
		res.send({message: "user not found"});
		return;
	} 

	playerQueue.addToQueue(user);
	res.send({message: "user added to queue"});
}

const startNewRandomGame = async (user1: User) => {
	if (playerQueue.length() === 0) {
		return undefined;
	}
	let user2 = playerQueue.firstInQueue();

	let player_O = user1;
	let player_X = user2;

	if (player_X === undefined) return undefined;


	let newGame: Game = {
		id: 'temp',
		gameState: [0,0,0,0,0,0,0,0,0],
		moveNumber: 0,
		gameType: 'Tic-Tac-Toe',
		active: true,
		outcome: null,
	}

	let game_addition = await prisma.game.create({data:{
		gameState: newGame.gameState,
		moveNumber: newGame.moveNumber,
		gameType: newGame.gameType,
		active: true,
	}});

	if (game_addition === undefined) {
		return undefined;
	}

	let player_O_entry = prisma.playerEntry.create({
		data: {
			username: player_O.username,
			gameId: game_addition.id,
			piece: "O",
		}
	});

	let player_X_entry = prisma.playerEntry.create({
		data: {
			username: player_X.username,
			gameId: game_addition.id,
			piece: "X",
		}
	});

	try {
		await prisma.$transaction([player_O_entry, player_X_entry]);           
	} catch (e) {
		console.error(e);
		return undefined;
	}

	return game_addition.id;

}

