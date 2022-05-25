import { useTTTContext } from "../../../contexts/TTTContext";
import Grid from "../../../components/Grid";

const TicTacToe = () => {
	const { gameState, dispatch } = useTTTContext();
	const { playerPiece } = gameState;
	const clickHandler = (piece) => {
		dispatch({ type: `PLAYER_BUTTON`, piece: piece });
	};

	return (
		<div className="flex flex-col md:flex-row min-h-[83vh] justify-evenly items-center">
			<section className="flex flex-row md:flex-col mt-10 justify-center items-center mx-auto md:ml-10 text-center w-4/5 md:w-1/6">
				<div className="card bg-info items-center justify-center w-1/3 md:w-1/2 text-neutral text-center rounded-lg">
					<h2 className="card-title">Player 1</h2>
					<div className="card-content md:card-body text-3xl md:text-5xl text-base-100">X</div>
		
				</div>
				<div className="divider divider-horizontal md:divider-vertical">{gameState.draw ? "DRAW" : "VS"}</div>
				<div className="card bg-error items-center justify-center w-1/3 md:w-1/2 text-neutral rounded-lg">
					<h2 className="card-title">Player 2</h2>
					<span className="text-3xl md:text-5xl card-content md:card-body ">O </span>
				</div>
			</section>

			<Grid />

			<div className="w-full md:w-1/6 gap-2 md:gap-0 flex flex-row md:flex-col items-center justify-center">
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
