import express from 'express';

const router = express.Router();

const {getAllGames, getGameById, createNewGame, editGameByGameId, deleteGameByGameId} = require('../controllers/game-controller.js')


//middleware specific to this router

// !!send can only be sent once without causing an error!!

router.get('/', getAllGames);

router.get('/:id', getGameById);

router.post('/new-game', createNewGame);

router.patch('/:gameId', editGameByGameId);

router.delete('/:gameId', deleteGameByGameId); 

module.exports = router;