const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt';
import { PassportStatic } from 'passport';


export const initializePassport =  (passport:PassportStatic, getUserByUsername: Function, getUserById: Function) => {
    const authenticateUser = async (username:string, password:string, done: Function) => {
        const user = await getUserByUsername(username)
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
    passport.deserializeUser((user: Express.User,done) => { 
        done(null, user)
    });
};
