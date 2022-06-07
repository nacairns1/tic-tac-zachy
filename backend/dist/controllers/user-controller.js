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
exports.loginUser = exports.getUserByUserId = exports.getUserByUsername = exports.registerNewUser = exports.getGamesByUser = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
exports.getAllUsers = getAllUsers;
const getGamesByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const games = yield prisma.playerEntry.findMany({ where: username });
    if (games === null) {
        return next(new Error("no games found"));
    }
    res.send({ games: games });
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
            return res.redirect('/login', 307);
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
const getUserByUserId = (id) => {
    return dummyUsers.find((user) => user.username === id);
};
exports.getUserByUserId = getUserByUserId;
const loginUser = (req, res, next) => {
    console.log("attempting log in...");
    if (req.user === undefined)
        return res.status(400).send({ message: "error" });
    const user = req.user;
    if (user.username) {
        console.log(`${req.user.username} succesful`);
        res.send({ user: req.user.username });
    }
    else {
        console.log("unsuccessful");
        res.status(400).send({ message: "error logging in" });
    }
};
exports.loginUser = loginUser;
