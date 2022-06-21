import { useState, useCallback, useEffect } from "react";
import { useTTTContext } from "../contexts/TTTContext";
import { useAuthContext } from "../contexts/AuthContext";
import Router from "next/router";
import axios from "axios";

const GameSection = (props) => {
	const [displayPiece, setDisplayPiece] = useState(" ");
	const [displayClassName, setDisplayClassName] = useState(
		"btn btn-square row-span-1 text-center align-middle bg-transparent h-5/6 w-5/6 border-none"
	);
	const { loggedInUser } = useAuthContext();
	const [victorySquare, setVictorySquare] = useState(false);
	const [activeGame, setActiveGame] = useState(true);
	const { gameState, dispatch } = useTTTContext();
	const { playerPiece } = gameState;
	const { gameSquareId } = props;

	const clickHandler = useCallback(async () => {
		if (!activeGame) return;
		if (!gameState.local) {
			if (playerPiece === "X" && gameState.playerX !== loggedInUser.username)
				return;
			if (playerPiece === "O" && gameState.playerO !== loggedInUser.username)
				return;
		}
		dispatch({ type: `SELECT_${playerPiece}`, gameSquareId: gameSquareId });
	}, [playerPiece, activeGame]);

	const updateDB = useCallback(async () => {
		if (!gameState.local) {
			try {
				let gameId = Router.asPath.split("/").pop();
				const httpMessageConfig = {
					method: "patch",
					url: `https://ttz-rest-pp2rerpupa-uc.a.run.app/tic-tac-toe/${gameId}`,
					data: {
						activePiece: gameState.playerPiece,
						gameState: gameState.board.board,
						moveNumber: gameState.moveNumber + 1,
						active: !(gameState.x_victory || gameState.o_victory),
					},
				};
				await axios(httpMessageConfig);
			} catch (e) {
				return;
			}
		}
	}, [gameState]);

	useEffect(() => {
		switch (gameState.board.board[gameSquareId]) {
			case 0:
				setDisplayPiece(" ");
				setDisplayClassName(
					"btn btn-square row-span-1 text-center align-middle btn-ghost h-5/6 w-5/6 border-none"
				);
				break;
			case 1:
				setDisplayPiece("X");
				setDisplayClassName(
					`btn btn-square btn-info row-span-1 text-center align-middle h-5/6 w-5/6 text-4xl`
				);
				break;
			case 2:
				setDisplayPiece("O");
				setDisplayClassName(
					`btn btn-square btn-error row-span-1 text-center align-middle h-5/6 w-5/6 text-4xl`
				);
				break;
			default:
				break;
		}
	}, [gameState]);

	useEffect(() => {
		if (gameState.winning_squares === undefined) return;
		setVictorySquare(gameState.winning_squares.includes(gameSquareId));
		if (gameState.winning_squares.length > 0) {
			setActiveGame(false);
		} else {
			setActiveGame(true);

		}
	}, [gameState.winning_squares]);

	useEffect(() => {
		if (!victorySquare) return;
		const index = gameState.winning_squares.findIndex(
			(gameSquare) => gameSquare === gameSquareId
		);
		setDisplayClassName(
			`btn btn-square btn-success row-span-1 text-center align-middle h-5/6 w-5/6 text-4xl ${
				index === 0
					? "animate-jump-once-no-delay btn-success bg-success"
					: index === 1
					? "animate-jump-once-sm-delay btn-success bg-success"
					: "animate-jump-once-md-delay btn-success bg-success"
			}`
		);
	}, [victorySquare]);

	useEffect(() => {
		if (gameState.draw) {
			setDisplayClassName((prev) => `${prev} animate-shake-once`);
		}
	}, [gameState.draw]);

	return (
		<button
			className={displayClassName}
			onClick={async () => {
				await clickHandler();
				await updateDB();
			}}
		>
			{displayPiece}
		</button>
	);
};

export default GameSection;
