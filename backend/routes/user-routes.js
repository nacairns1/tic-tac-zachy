const express = require('express');
const nanoid = require('nanoid');

const router = express.Router();

router.use((req, res, next) => {
    next();
})

router.get('/', (req, res)=>{
    console.log('visiting user-routes');
    res.send({message: 'seeing user-routes'});
});

router.post('/new-user', (req, res, next) => {

})

module.exports = {userRoutes: router};