const mongoose = require('mongoose');
const {Schema} = mongoose;

const gameSchema = new Schema({
    gameId: {type: String, required: true},
    players: [{
        player: {type: mongoose.Types.ObjectId, required: true, ref:'User'},
        piece: String
     }],
    game: {type: [Number], required: true},
});

module.exports = mongoose.model('Game', gameSchema);