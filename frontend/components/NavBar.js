import { Fragment, useState, useReducer, useEffect, useCallback } from "react";
import Link from "next/link";
import Router from "next/router";

import { useAuthContext } from "../contexts/AuthContext";
import { NewGameModal } from "../components/NewGameModal";

const navigation = [
	{ name: "Home", href: "/", current: true },
	{ name: "Tic-Tac-Toe", href: "#", current: false },
];

const LightButton = (props) => {
	return (
		<button className="btn btn-ghost btn-circle" onClick={props.onClick}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		</button>
	);
};

const DarkButton = (props) => {
	return (
		<button className="btn btn-ghost btn-circle" onClick={props.onClick}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>
		</button>
	);
};

const themeReducer = (state, action) => {
	switch (action.type) {
		case "light":
			state.theme = "light";
			document.body.dataset.theme = state.theme;
			window.localStorage.setItem("theme", state.theme);
			return { ...state };
		case "dark":
			state.theme = "dark";
			document.body.dataset.theme = state.theme;
			window.localStorage.setItem("theme", state.theme);
			return { ...state };
		default:
			return { ...state };
	}
};

const NavBar = () => {
	const { loggedInUser, authDispatch } = useAuthContext();

	useEffect(() => {
		if (!localStorage) return;
		const iUser = localStorage.getItem("CURRENT_USER");
		if (iUser !== null)
			authDispatch({ type: "LOGIN_SUCCESS", username: iUser });
	}, []);

	const [profileTabOpen, setProfileTabOpen] = useState(false);
	const [playTabOpen, setPlayTabOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [themeState, dispatch] = useReducer(themeReducer, { theme: "dark" });

	const logoutHandler = useCallback(() => {
		authDispatch({ type: "LOGOUT" });
		setProfileTabOpen(false);
		Router.push(`/`);
	});

	useEffect(() => {
		const savedTheme = window.localStorage.getItem("theme");
		savedTheme && dispatch({ type: savedTheme });
	}, []);

	return (
		<>
			<NewGameModal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
				}}
			/>
			<div className="navbar bg-base-300">
				<div className="flex-1">
					<Link href="/">
						<a className="btn btn-ghost normal-case text-xl">TTZ</a>
					</Link>
				</div>
				{themeState.theme === "dark" ? (
					<LightButton
						onClick={() => {
							dispatch({ type: "light" });
						}}
					/>
				) : (
					<DarkButton
						onClick={() => {
							dispatch({ type: "dark" });
						}}
					/>
				)}
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<label
							tabIndex="0"
							className="btn btn-ghost btn-circle"
							onClick={() => {
								setProfileTabOpen(false);
								setPlayTabOpen((prev) => !prev);
							}}
						>
							<div className="w-10 rounded-full flex justify-center align-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						</label>
						{playTabOpen && (
							<div
								tabIndex="0"
								className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
							>
								<div className="card-body">
									<button
										className="btn btn-ghost"
										onClick={() => {
											setPlayTabOpen(false);
											setModalOpen(true);
										}}
									>
										START NEW GAME!
									</button>
								</div>
							</div>
						)}
					</div>

					<div className="dropdown dropdown-end">
						<label
							tabIndex="0"
							className="btn btn-ghost"
							onClick={() => {
								setPlayTabOpen(false);
								setProfileTabOpen((prev) => !prev);
							}}
						>
							<div className="flex items-center">
								<label className="text-sm italic font-semibold">
									{loggedInUser.username}
								</label>
							</div>
							<div className="w-10 rounded-full flex justify-center align-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</div>
						</label>

						{profileTabOpen && (
							<ul
								tabIndex="0"
								className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									
										<button
											className="btn btn-ghost btn-sm"
											onClick={() => {
												setProfileTabOpen(false);
												Router.push(loggedInUser.loggedIn ? {pathname: `/users/${loggedInUser.username}`} : '/users/login')
											}}
										>
											{loggedInUser.loggedIn ? `Profile` : "Login / Register"}
										</button>
	
								</li>

								{loggedInUser.loggedIn && (
									<li>
										<button
											className="btn btn-ghost btn-sm"
											onClick={logoutHandler}
										>
											Logout
										</button>
									</li>
								)}
							</ul>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

module.exports = { NavBar };
