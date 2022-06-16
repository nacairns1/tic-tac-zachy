"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinGameQueue = exports.deleteGameByGameId = exports.editGameByGameId = exports.createNewGame = exports.getGameById = exports.getAllGames = void 0;
const client_1 = require("@prisma/client");
const ttt_queue_1 = require("../user-queue/ttt-queue");
const prisma = new client_1.PrismaClient();
const playerQueue = new ttt_queue_1.TTTQueue();
//all functions for /tic-tac-toe
// function for GET / path
const getAllGames = (req, res, next) => {
    // res.send({ games: TTT_GAMES });
};
exports.getAllGames = getAllGames;
/** function for GET /:id path */
const getGameById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const game = yield prisma.game.findUnique({ where: { id } });
    if (game === null) {
        res.send({ message: "no game found" });
        return;
    }
    res.send({ game });
});
exports.getGameById = getGameById;
const createNewGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const player_X = req.body.player_X;
    const player_O = req.body.player_O;
    let new_game = yield prisma.game.create({ data: {
            gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            moveNumber: 0,
            gameType: "Tic-Tac-Toe",
            active: true,
        } });
    let player_O_entry = prisma.playerEntry.create({
        data: {
            username: player_O.username,
            gameId: new_game.id,
            piece: "O",
        }
    });
    let player_X_entry = prisma.playerEntry.create({
        data: {
            username: player_X.username,
            gameId: new_game.id,
            piece: "X",
        }
    });
    yield prisma.$transaction([player_O_entry, player_X_entry]);
    res.send({ game: new_game });
});
exports.createNewGame = createNewGame;
const editGameByGameId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.gameId;
    const newGameState = req.body.game;
    const gameFromDatabase = yield prisma.game.findUnique({ where: { id: gameId } });
    if (gameFromDatabase === null)
        return res.send({ message: "no game found" });
    gameFromDatabase.gameState = newGameState;
    res.send({ game: gameFromDatabase });
});
exports.editGameByGameId = editGameByGameId;
const deleteGameByGameId = (req, res, next) => {
    res.send({ message: "deleted!" });
};
exports.deleteGameByGameId = deleteGameByGameId;
const joinGameQueue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const new_user = req.body.username;
    if (playerQueue.length() > 0) {
        let newGame = yield startNewRandomGame(new_user);
        res.send({ gameId: newGame });
        return;
    }
    let user = yield prisma.user.findUnique({ where: { username: new_user.username } });
    if (user === null) {
        res.send({ message: "user not found" });
        return;
    }
    playerQueue.addToQueue(user);
    res.send({ message: "user added to queue" });
});
exports.joinGameQueue = joinGameQueue;
const startNewRandomGame = (user1) => __awaiter(void 0, void 0, void 0, function* () {
    if (playerQueue.length() === 0) {
        return undefined;
    }
    let user2 = playerQueue.firstInQueue();
    let player_O = user1;
    let player_X = user2;
    if (player_X === undefined)
        return undefined;
    let newGame = {
        id: 'temp',
        gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        moveNumber: 0,
        gameType: 'Tic-Tac-Toe',
        active: true,
        outcome: null,
    };
    let game_addition = yield prisma.game.create({ data: {
            gameState: newGame.gameState,
            moveNumber: newGame.moveNumber,
            gameType: newGame.gameType,
            active: true,
        } });
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
        yield prisma.$transaction([player_O_entry, player_X_entry]);
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
    return game_addition.id;
});
