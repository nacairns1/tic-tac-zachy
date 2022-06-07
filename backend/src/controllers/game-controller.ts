import { RequestHandler } from "express";

const nanoid = require("nanoid");

const TTT_GAMES = [
	{
		id: "game1",
		game: "tic-tac-toe",
		gameState: [0, 1, 0, 0, 2, 1, 1, 2, 2],
		players: [
			{
				userId: "user1",
				piece: "x",
			},
			{
				userId: "user2",
				piece: "o",
			},
		],
	},
	{
		id: "game2",
		game: "tic-tac-toe",
		gameState: [0, 1, 1, 0, 1, 2, 2, 1, 2],
		players: [
			{
				userId: "user1",
				piece: "x",
			},
			{
				userId: "user3",
				piece: "o",
			},
		],
	},
	{
		id: "game3",
		gameState: [0, 1, 2, 0, 1, 2, 2, 1, 0],
		players: [
			{
				userId: "user3",
				piece: "x",
			},
			{
				userId: "user2",
				piece: "o",
			},
		],
	},
];
//all functions for /tic-tac-toe

// function for GET / path

export const getAllGames: RequestHandler = (req, res, next) => {
	res.send({ games: TTT_GAMES });
};

// function for GET /:id path
export const getGameById: RequestHandler = (req, res, next) => {
	const id = req.params.id;
	const game = TTT_GAMES.find((game) => game.id === id);
	res.send({ game: game });
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

