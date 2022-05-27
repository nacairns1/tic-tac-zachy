const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const getUserByUsername = require('./controllers/user-controller');


const initialize =  (passport, getUserByUsername, getUserById) => {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, {message: 'login failed'})
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else {
                return done(null, false, {message: 'password incorrect'});
            }
        } catch (e ){
            return done(e);
        }

    }


    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user,done) => {
        done(null, user) });
    passport.deserializeUser((user,done) => { 
        done(null, user)
    });
};

module.exports = initialize;