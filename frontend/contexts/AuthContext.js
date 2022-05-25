import { createContext, useContext, useReducer } from "react";
import Router from "next/router";

const AuthContext = createContext();

const authStateReducer = async (state, action) => {
    const {username, password} = action;
    //pull in hashed login from dB
	switch (action.type) {
		case "login":
			break;
		case "register":
			break;
		default:
			break;
	}
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
	return useContext(AuthContext);
};

module.exports = {AuthWrapper, useAuthContext}