import express from 'express';

const router = express.Router();

import { getAllGames, getGameById, createNewGame, editGameByGameId, deleteGameByGameId, joinGameQueue } from '../controllers/game-controller.js';


//middleware specific to this router

// !!send can only be sent once without causing an error!!

router.get('/', getAllGames);

router.get('/:id', getGameById);

router.post('/new_game/random_user', joinGameQueue);

router.post('/new_game/invite', createNewGame);

router.patch('/:gameId', editGameByGameId);

router.delete('/:gameId', deleteGameByGameId); 


export default router;