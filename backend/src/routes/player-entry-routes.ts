import express from 'express';

const router = express.Router();

import { getPlayerEntriesByGameId } from '../controllers/player-entry-controller.js';

router.get('/:gameId', getPlayerEntriesByGameId);


export default router;