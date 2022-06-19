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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getUserByUsername = exports.registerNewUser = exports.getGamesByUser = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = (req, res, next) => {
    res.send();
};
exports.getAllUsers = getAllUsers;
const getGamesByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    console.log(req.body);
    if (username == null) {
        res.status(400).send({ message: "No user found." });
        return;
    }
    let games;
    let updatedGames;
    try {
        let user = yield prisma.user.findUnique({ where: { username: username } });
        if (user === null) {
            res.status(400).send({ message: "No user found!" });
            console.log("no user found");
            return;
        }
        let playerEntries = yield prisma.playerEntry.findMany({
            where: { userId: user.id },
        });
        if (playerEntries === null) {
            res.status(400).send({ message: "No games found!" });
            console.log("no game found");
            return;
        }
        let gameFetchPromises = playerEntries.map((pE) => prisma.game.findUnique({ where: { id: pE.gameId } }));
        let gamesFromDB = yield prisma.$transaction(gameFetchPromises);
        gamesFromDB = gamesFromDB.filter((result) => result !== null);
        let playersPromises = gamesFromDB.map((game) => prisma.playerEntry.findMany({ where: { gameId: game === null || game === void 0 ? void 0 : game.id } }));
        let playerEntryFetch = yield prisma.$transaction(playersPromises);
        let players_users_fetch = playerEntryFetch.map((entry) => entry.map(rawPlayer => prisma.user.findUnique({ where: { id: rawPlayer.userId } })));
        let usersFromDB = yield prisma.$transaction(players_users_fetch.flat(1));
        let updatedPlayerEntries = playerEntryFetch.map((pair) => {
            return pair.map((playerEntry) => {
                var _a;
                let username = (_a = usersFromDB.find(user => (user === null || user === void 0 ? void 0 : user.id) === playerEntry.userId)) === null || _a === void 0 ? void 0 : _a.username;
                return Object.assign(Object.assign({}, playerEntry), { username });
            });
        });
        updatedGames = gamesFromDB.map((game, index) => {
            return Object.assign(Object.assign({}, game), { players: updatedPlayerEntries.find((pair) => pair.find(stored_game => stored_game.gameId === (game === null || game === void 0 ? void 0 : game.id))) });
        });
        games = gamesFromDB;
    }
    catch (e) {
        console.error(e);
        games = [];
    }
    if (updatedGames === undefined) {
        console.error('error detected');
        return;
    }
    res.send({ games: updatedGames });
});
exports.getGamesByUser = getGamesByUser;
const registerNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = { username: username, password: hashedPassword };
        try {
            const dbUser = yield prisma.user.create({ data: user });
            console.log(`${dbUser.username} registered successfully`);
            res.redirect("/users/login", 307);
            return;
        }
        catch (e) {
            console.error(e);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});
exports.registerNewUser = registerNewUser;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { username } });
    return user;
});
exports.getUserByUsername = getUserByUsername;
const loginUser = (req, res, next) => {
    console.log("attempting log in...");
    if (req.user === undefined)
        return res.status(400).send({ message: "error" });
    const user = req.user;
    if (user.username !== undefined) {
        console.log(`${user.username} succesful`);
        res.send({ user: user.username });
    }
    else {
        console.log("unsuccessful");
        res.status(400).send({ message: "error logging in" });
    }
};
exports.loginUser = loginUser;
