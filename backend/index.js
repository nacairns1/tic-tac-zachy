const express = require('express');
const gameRoutes = require('./routes/game-routes');
const {userRoutes} = require('./routes/user-routes'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const port = 5000;
const app = express();


try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log('connected to mongoose');
} catch {
    throw console.error();
}

app.listen(port, ()=>{console.log('backend up and running')});

app.use(bodyParser.json());

app.use('/tic-tac-toe', gameRoutes);

app.use('/users', userRoutes);