const Router = require("next/router");
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import GamePreview from "../../components/GamePreview.js";

const User = (props) => {
	const [user, setUser] = useState();
	const [games, setGames] = useState();

	useEffect(() => {
		setUser(props.user);
		async function updateData(userObj) {
			const { user } = userObj;
			try {
				const res = await axios({
					method: "get",
					url: `http://localhost:5000/users/games/${user}`,
				});
				const { games } = res.data;
				setUser(user);
				setGames(games);
			} catch (e) {}
		}
		if (Router.default.query.user != undefined) updateData(Router.default.query);
	}, []);

	return (
		<div className="flex justify-center  items-center px-10 py-10 w-full">
			<div className="flex flex-col w-full justify-center items-center">
				<h2 className="text-7xl font-extrabold text-center place-self-start">
					{user}
				</h2>
				<h4 className="text-3xl font-bold text-center place-self-start pt-5">
					Games
				</h4>
				<div className="w-full flex flex-row justify-center items-center">
					<div className="py-10 flex justify-center gap-10 flex-wrap">
						{games === undefined || games.length === 0
							? "No Games Found!"
							: games.reverse().map((game) => <GamePreview game={game} key={game.id} />)}
					</div>
				</div>
			</div>
		</div>
	);
};


User.getInitialProps = (ctx) => {
	const { user } = ctx.query;
	return { user };
};
module.exports = User;
