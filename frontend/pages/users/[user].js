const Router = require("next/router");
import axios from "axios";
import { useEffect, useState } from "react";
import GamePreview from "../../components/GamePreview.js";

const User = (props) => {
	const [user, setUser] = useState();
	const [games, setGames] = useState();

	useEffect(() => {
		if (props.res) {
			setUser(props.user);
			setUser(props.res.games);
		}
	});

	return (
		<div className="flex justify-center  items-center px-10 py-10 w-full">
			<div className="flex flex-col w-full justify-center items-center">
				<h2 className="text-7xl font-extrabold text-center place-self-start">
					{user}
				</h2>
				<div className="w-full flex flex-row justify-center items-center">
					{/* <button className="btn btn-secondary btn-lg rounded-3xl">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
							/>
						</svg>
					</button> */}
					<div className="py-10 flex justify-center gap-10 flex-wrap">
						{games === undefined || games.length === 0 ? "No Active Games!" : "Active Games!"}
					</div>
					{/* <button className="btn btn-secondary btn-lg rounded-3xl">
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
								d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
							/>
						</svg>
					</button> */}
				</div>
			</div>
		</div>
	);
};

User.getInitialProps = async (ctx) => {
	const { user } = ctx.query;
	const res = await axios.get("http://localhost:5000/users/games", {
		data: { username: user },
	});
	const { games } = res.data;
	return { games, user };
};

module.exports = User;
