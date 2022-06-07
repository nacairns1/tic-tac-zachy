import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_ATTEMPT":
			break;
		case "LOGIN_SUCCESS":
			state.username = action.username;
			if (localStorage) localStorage.setItem("CURRENT_USER", action.username);
			state.loggedIn = true;
			break;
		case "LOGOUT":
			delete state.username;
			localStorage.removeItem("CURRENT_USER");
			state.loggedIn = false;
		default:
			break;
	}
	return { ...state };
};

const AuthWrapper = ({ children }) => {
	const [loggedInUser, authDispatch] = useReducer(authReducer, {username: '', loggedIn: false});
	const authContextValue = () => {
		return { loggedInUser, authDispatch };
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

const findInitialLogin = () => {};

module.exports = { AuthWrapper, useAuthContext };
