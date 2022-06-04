const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    games: [{type: mongoose.Types.ObjectId, required: true, ref:'Game'}],
});

module.exports = mongoose.model('User', userSchema);