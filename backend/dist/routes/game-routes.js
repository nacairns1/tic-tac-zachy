"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const game_controller_js_1 = require("../controllers/game-controller.js");
//middleware specific to this router
// !!send can only be sent once without causing an error!!
router.get('/', game_controller_js_1.getAllGames);
router.get('/:id', game_controller_js_1.getGameById);
router.post('/new-game', game_controller_js_1.createNewGame);
router.patch('/:gameId', game_controller_js_1.editGameByGameId);
router.delete('/:gameId', game_controller_js_1.deleteGameByGameId);
exports.default = router;
