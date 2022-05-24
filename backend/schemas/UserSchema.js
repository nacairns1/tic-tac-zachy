const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    games: [{type: mongoose.Types.ObjectId, required: true, ref:'Game'}],
});

module.exports = mongoose.model('User', userSchema);