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
exports.getQueueState = exports.leaveGameQueue = exports.joinGameQueue = exports.deleteGameByGameId = exports.editGameByGameId = exports.createNewGame = exports.getGameById = exports.getAllGames = void 0;
const client_1 = require("@prisma/client");
const ttt_queue_1 = require("../user-queue/ttt-queue");
const prisma = new client_1.PrismaClient();
const playerQueue = new ttt_queue_1.TTTQueue();
const randomQueueGames = new Map();
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
    const player_X = req.body.player_x;
    const player_O = req.body.player_o;
    let X_userId;
    let O_userId;
    try {
        X_userId = yield prisma.user.findUnique({
            where: { username: player_X },
        });
        O_userId = yield prisma.user.findUnique({
            where: { username: player_O },
        });
        if (X_userId === null || O_userId === null) {
            res.status(400).send({ message: "Player not found." });
            return;
        }
    }
    catch (e) {
        console.error(e);
        res.status(400).send({ message: "one or more users not found." });
        return;
    }
    console.log({ X_userId, O_userId });
    let new_game;
    try {
        new_game = yield prisma.game.create({
            data: {
                gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                moveNumber: 0,
                gameType: "Tic-Tac-Toe",
                active: true,
            },
        });
    }
    catch (e) {
        console.error(e);
        res.status(400).send({ message: "game could not be created" });
        return;
    }
    let player_O_entry = prisma.playerEntry.create({
        data: {
            userId: O_userId.id,
            gameId: new_game.id,
            piece: "O",
        },
    });
    let player_X_entry = prisma.playerEntry.create({
        data: {
            userId: X_userId.id,
            gameId: new_game.id,
            piece: "X",
        },
    });
    let o_entry;
    let x_entry;
    try {
        [o_entry, x_entry] = yield prisma.$transaction([
            player_O_entry,
            player_X_entry,
        ]);
    }
    catch (e) {
        console.error(e);
        console.log(O_userId, X_userId, new_game);
        res
            .status(400)
            .send({ message: "error while updating the player entries" });
        return;
    }
    if (o_entry === undefined || x_entry === undefined) {
        console.error("error updating game");
        return undefined;
    }
    const updateGameforO = prisma.game.update({
        where: { id: new_game.id },
        data: {
            players: {
                connect: {
                    id: o_entry.id,
                },
            },
        },
    });
    const updateGameforX = prisma.game.update({
        where: { id: new_game.id },
        data: {
            players: {
                connect: {
                    id: x_entry.id,
                },
            },
        },
    });
    const updateUserforX = prisma.user.update({
        where: { id: X_userId.id },
        data: {
            ongoingGames: {
                connect: {
                    gameId_userId: {
                        gameId: new_game.id,
                        userId: X_userId.id,
                    },
                },
            },
        },
    });
    const updateUserforO = prisma.user.update({
        where: { id: O_userId.id },
        data: {
            ongoingGames: {
                connect: {
                    gameId_userId: {
                        gameId: new_game.id,
                        userId: O_userId.id,
                    },
                },
            },
        },
    });
    try {
        yield prisma.$transaction([
            updateGameforO,
            updateGameforX,
            updateUserforO,
            updateUserforX,
        ]);
    }
    catch (e) {
        console.error(e);
        res.status(400).send({ messsage: "Error updating user entries" });
    }
    res.send({ game: new_game });
});
exports.createNewGame = createNewGame;
const editGameByGameId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.gameId;
    const newGameState = req.body.gameState;
    const newActivePiece = req.body.activePiece;
    const moveNumber = req.body.moveNumber;
    let gameFromDatabase;
    try {
        gameFromDatabase = yield prisma.game.update({
            where: { id: gameId },
            data: {
                gameState: newGameState,
                activePiece: newActivePiece,
                moveNumber
            },
        });
    }
    catch (e) {
        console.error(e);
        res.status(400).send({ message: "error editing the current game" });
        return;
    }
    if (gameFromDatabase === undefined || gameFromDatabase === null)
        return res.send({ message: "no game found" });
    res.send({ game: gameFromDatabase });
});
exports.editGameByGameId = editGameByGameId;
const deleteGameByGameId = (req, res, next) => {
    res.send({ message: "deleted!" });
};
exports.deleteGameByGameId = deleteGameByGameId;
const joinGameQueue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const new_user = req.body.username;
    let user = yield prisma.user.findUnique({
        where: { username: new_user },
    });
    if (user === null) {
        res.send({ message: "user not found" });
        return;
    }
    if (playerQueue.length() > 0) {
        let newGame = yield startNewRandomGame(user);
        res.send({ gameId: newGame });
        return;
    }
    playerQueue.addToQueue(user);
    res.send({ message: "user added to queue" });
});
exports.joinGameQueue = joinGameQueue;
const startNewRandomGame = (user1) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(playerQueue);
    if (playerQueue.length() === 0) {
        playerQueue.addToQueue(user1);
        return;
    }
    let user2 = playerQueue.firstInQueue();
    let player_O = user1;
    let player_X = user2;
    if (player_X === undefined)
        return undefined;
    let newGame = {
        id: "temp",
        gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        moveNumber: 0,
        gameType: "Tic-Tac-Toe",
        active: true,
        activePiece: "X",
        outcome: null,
    };
    let game_addition = yield prisma.game.create({
        data: {
            gameState: newGame.gameState,
            moveNumber: newGame.moveNumber,
            gameType: newGame.gameType,
            active: true,
        },
    });
    if (game_addition === undefined) {
        return;
    }
    let player_O_entry = prisma.playerEntry.create({
        data: {
            userId: player_O.id,
            gameId: game_addition.id,
            piece: "O",
        },
    });
    let player_X_entry = prisma.playerEntry.create({
        data: {
            userId: player_X.id,
            gameId: game_addition.id,
            piece: "X",
        },
    });
    randomQueueGames.set(player_X.username, game_addition.id);
    try {
        yield prisma.$transaction([player_O_entry, player_X_entry]);
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
    return game_addition.id;
});
const leaveGameQueue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const playerToRemove = req.body.username;
    let user = yield prisma.user.findUnique({
        where: { username: playerToRemove },
    });
    if (user === null) {
        res.send({ message: "user not found" });
        return;
    }
    let leaveQueueResult = playerQueue.removeUserFromQueue(user);
    if (exports.leaveGameQueue === undefined) {
        res.send({ message: "User not found in queue" });
        return;
    }
    else {
        res.send({ message: "User removed from queue" });
    }
});
exports.leaveGameQueue = leaveGameQueue;
const getQueueState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const playerToSearch = req.body.username;
    if (randomQueueGames.get(playerToSearch) !== undefined) {
        res.send({ gameId: randomQueueGames.get(playerToSearch) });
        return;
    }
    else {
        res.send({ message: "No game found yet." });
        return;
    }
});
exports.getQueueState = getQueueState;
