import { useTTTContext } from "../../../contexts/TTTContext";
import Grid from "../../../components/Grid";
import { PlayerSection } from "../../../components/PlayerSection";
import { useEffect, useState } from "react";

const TicTacToe = (props) => {
	const { gameState, dispatch } = useTTTContext();
	const [playerX, setPlayerX] = useState(". . .");
	const [playerO, setPlayerO] = useState(". . .");

	const { game } = props;
	const { players } = props;
	const { playerPiece } = gameState;

	useEffect(() => {
		dispatch({ type: "LOAD_GAME", game: game, players: players });
	}, []);

	useEffect(() => {
		async function fetchDataInterval(gameId) {
			const res = await fetch(`http://localhost:5000/tic-tac-toe/${gameId}`);
			const players_res = await fetch(
				`http://localhost:5000/player-entries/${gameId}`
			);
			const players = await players_res.json();
			const json = await res.json();
			const { game } = json;

			dispatch({type: "LOAD_GAME", game, players});
		}

		const interval = setInterval(() => {
			fetchDataInterval(props.gameId)
		}, 5000);

		return () => clearInterval(interval);

	}, []);

	return (
		<div className="flex flex-col md:flex-row justify-evenly items-center pt-10">
			<PlayerSection playerX={playerX} playerO={playerO} />

			<Grid />

			<div className="w-full md:w-1/6 gap-2 md:gap-0 flex flex-row md:flex-col items-center justify-center mt-10 ">
				<div
					id="piece-buttons"
					className="flex btn-group justify-center items-center"
				>
					<button
						className={`btn btn-square 
							${playerPiece === "O" && "btn-disabled"}
							${playerPiece === "X" && "btn-primary btn-info"}`}
					>
						X
					</button>
					<button
						className={`btn btn-square ${
							playerPiece === "X" && "btn-disabled"
						} ${playerPiece === "O" && "btn-primary btn-error"}`}
					>
						O
					</button>
				</div>

				{/* <div className="flex flex-row md:flex-col gap-2 my-8">
					<button className="btn btn-outline"
					onClick={()=>{dispatch({type: 'NEW_GAME'})}}>REMATCH</button>
				</div> */}
			</div>
		</div>
	);
};

TicTacToe.getInitialProps = async (ctx) => {
	const { gameId } = ctx.query;

	const res = await fetch(`http://localhost:5000/tic-tac-toe/${gameId}`);
	const players_res = await fetch(
		`http://localhost:5000/player-entries/${gameId}`
	);
	const players = await players_res.json();
	const json = await res.json();
	const { game } = json;
	return { game, players, gameId };
};

export default TicTacToe;
