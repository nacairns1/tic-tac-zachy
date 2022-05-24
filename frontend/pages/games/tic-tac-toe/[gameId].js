import { useEffect, useState } from "react";
import { useTTTContext } from "../../../contexts/TTTContext";
import Grid from "../../../components/Grid";
import { useRouter } from "next/router";

const TicTacToe = () => {
	const { gameState, dispatch } = useTTTContext();
	const { playerPiece } = gameState;
	const [gameId, setGameId] = useState("");
	const router = useRouter();

	useEffect(() => {
		const { gameId } = router.query;
		setGameId(gameId);
	}, [router.query]);

	const clickHandler = (piece) => {
		dispatch({ type: `PLAYER_BUTTON`, piece: piece });
	};

	return (
		<div className="flex flex-row items-center">
			<section className="ml-10 text-center w-1/12">
				<div><h2>User1</h2><span>X</span></div>
				<div className="divider divider-vertical">VS</div>
				<div><h2>User2</h2><span>O</span></div>
			</section>


			<div className="container mx-auto w-full h-[36rem] flex-col justify-center align-middle content-center items-center">
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
			<section className="mr-10 text-center w-1/12">
				<div><h2>User1</h2><span>X</span></div>
				<div className="divider divider-vertical">VS</div>
				<div><h2>User2</h2><span>O</span></div>
			</section>
		</div>
	);
};

export default TicTacToe;
