import { useTTTContext } from "../../contexts/TTTContext";
import Grid from "../../components/Grid";

const TicTacToe = () => {
	const { gameState, dispatch } = useTTTContext();
	const { playerPiece } = gameState;
	const clickHandler = (piece) => {
		dispatch({ type: `PLAYER_BUTTON`, piece: piece });
	};

	return (
		<div className="container mx-auto w-full flex-col justify-center align-middle content-center items-center">

			<div className="flex flex-row justify-center items-center mt-10">
					<button className="btn w-1/3">Play Locally on Browser</button>
                    <div className="divider divider-horizontal"></div>
					<button className="btn w-1/3">Invite a Friend to Play</button>
			</div>

			<div
				id="player-buttons"
				className="w-fit container mx-auto flex gap-4 mt-10 mb-10"
			>
				<button
					className={`btn btn-square ${
						playerPiece === "X" && "btn-primary btn-info"
					}`}
					onClick={() => {
						clickHandler("X");
					}}
				>
					X
				</button>
				<button
					className={`btn btn-square ${
						playerPiece === "O" && "btn-primary btn-error"
					}`}
					onClick={() => {
						clickHandler("O");
					}}
				>
					O
				</button>
			</div>
			<Grid />
			<button
				className="btn btn-warning mx-auto flex mt-12 mb-20"
				onClick={clickHandler}
			>
				NEW GAME
			</button>
		</div>
	);
};

export default TicTacToe;
