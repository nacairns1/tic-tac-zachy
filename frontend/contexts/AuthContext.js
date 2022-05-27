import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthWrapper = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState();
	const authContextValue = () => {
		return {loggedInUser, setLoggedInUser};
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