import { createContext, useContext, useReducer } from "react";
import Router from "next/router";
const bcrypt = require('bcrypt');

const AuthContext = createContext();

async function hash(password) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

const authStateReducer = async (state, action) => {
    const {plainTextPW} = action;
    //pull in hashed login from dB
    const dBPassHashed = await fetch({})
    const hashed = await hash(plainTextPW);
    const isValid = await bcrypt.compare(hashed, dBPassHashed)
}

const AuthWrapper = ({ children }) => {
	const [authState, dispatch] = useReducer(authStateReducer, {
        username: '',
        loggedIn: false
	});
	const authContextValue = () => {
		return { authState, dispatch };
	};
	return (
		<AuthContext.Provider value={authContextValue()}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuthContext = () => {
	return useContext(TTTContext);
};

module.exports = {AuthWrapper, useAuthContext}