import { useTTTContext } from "../../../contexts/TTTContext";
import Grid from "../../../components/Grid";
import { PlayerSection } from "../../../components/PlayerSection";

const TicTacToe = () => {
	const { gameState, dispatch } = useTTTContext();
	const { playerPiece } = gameState;
	const clickHandler = (piece) => {
		dispatch({ type: `PLAYER_BUTTON`, piece: piece });
	};

	return (
		<div className="flex flex-col md:flex-row justify-evenly items-center pt-10">
			<PlayerSection />
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

				<div className="flex flex-row md:flex-col gap-2 my-8">
					<button className="btn btn-outline"
					onClick={()=>{dispatch({type: 'NEW_GAME'})}}>REMATCH</button>
				</div>
			</div>
		</div>
	);
};

export default TicTacToe;
