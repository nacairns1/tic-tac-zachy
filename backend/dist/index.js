"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_routes_1 = __importDefault(require("./routes/game-routes"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const passport_config_1 = require("./passport-config");
const user_controller_1 = require("./controllers/user-controller");
require("dotenv").config();
const secret = process.env.SESSION_SECRET;
(0, passport_config_1.initializePassport)(passport_1.default, user_controller_1.getUserByUsername, user_controller_1.getUserByUserId);
const secretCheck = () => {
    if (secret === undefined) {
        throw Error('undefined secret');
    }
};
secretCheck();
const port = 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_flash_1.default)());
app.use((0, express_session_1.default)({
    secret: secret,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.listen(port, () => {
    console.log("backend up and running");
});
app.use("/tic-tac-toe", game_routes_1.default);
app.use("/users", user_routes_1.default);
