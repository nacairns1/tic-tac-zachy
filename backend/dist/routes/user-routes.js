"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const user_controller_1 = require("../controllers/user-controller");
const router = express_1.default.Router();
router.get("/games/:username", user_controller_1.getGamesByUser);
router.post("/register", user_controller_1.registerNewUser);
router.post("/login", passport_1.default.authenticate("local", {}), user_controller_1.loginUser);
router.get("/", user_controller_1.getAllUsers);
exports.default = router;
