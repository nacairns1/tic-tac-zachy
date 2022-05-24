const nanoid = require('nanoid');
const User = require('../schemas/UserSchema');

const getAllUsers = (req,res,next) => {
    console.log('visiting user-routes');
}

const addNewUser = async (req, res, next) => {
    const username = req.body.username;
    const user = new User({
        username: username,
        games: []
    }); 
    await user.save()
    res.send({message: 'successfully added user', user: user});
}

const getGamesByUser = async(req, res, next) => {
    const username = req.params.username;
    const games = await User.find({ username: username}).exec();
    res.send({games: games});
}

module.exports = {getAllUsers, addNewUser, getGamesByUser}