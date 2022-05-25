const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSchema = new Schema({
	gameId: { type: String, required: true },
	game: { type: String, required: true },
	gameState: { type: [Number], required: true },
	players: [
		{
			player: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
			piece: String,
		},
	],
});

module.exports = mongoose.model("Game", gameSchema);
