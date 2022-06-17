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
exports.getPlayerEntriesByGameId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPlayerEntriesByGameId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let gameId = req.params.gameId;
    let players;
    try {
        players = yield prisma.playerEntry.findMany({ where: { gameId } });
        let players_users_fetch = players.map((rawPlayer) => prisma.user.findUnique({ where: { id: rawPlayer.userId } }));
        let users = yield prisma.$transaction([...players_users_fetch]);
        players = players.map((player) => {
            let user = users.find(user => user !== null && user.id === player.userId);
            if (user === null || user === undefined)
                return player;
            return Object.assign(Object.assign({}, player), { username: user.username });
        });
    }
    catch (e) {
        res.status(400).send({ message: " no players found" });
    }
    if (players === undefined) {
        res.status(400).send({ message: " no players found" });
    }
    res.send({ players });
});
exports.getPlayerEntriesByGameId = getPlayerEntriesByGameId;
