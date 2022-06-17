import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { TTTQueue } from "../user-queue/ttt-queue";
import { Game } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

export const getPlayerEntriesByGameId: RequestHandler = async (req, res, next) => {
	let gameId = req.params.gameId;

    let players;
	try {
        players = await prisma.playerEntry.findMany({where: {gameId}});
        let players_users_fetch = players.map((rawPlayer) => prisma.user.findUnique({where: {id: rawPlayer.userId}}));
        let users = await prisma.$transaction([...players_users_fetch]);
        players = players.map((player) => {
            let user = users.find(user => user !== null && user.id === player.userId);
            if (user === null || user === undefined) return player;

            return {...player, username: user.username};
        })

	} catch (e) {
        res.status(400).send({message:" no players found"});
    }
    if (players === undefined) {
        res.status(400).send({message:" no players found"});
    }

    res.send({players});
};
