import { useState, useCallback, useEffect } from "react";
import { useTTTContext } from "../contexts/TTTContext";

const GameSection = (props) => {
	const [displayPiece, setDisplayPiece] = useState(" ");
	const { gameState, dispatch } = useTTTContext();
	const { playerPiece } = gameState;
	const { gameSquareId } = props;

	const clickHandler = () => {
		dispatch({ type: `SELECT_${playerPiece}`, gameSquareId: gameSquareId });
	};

	useEffect(() => {
		switch (gameState.board.board[gameSquareId]) {
			case 0:
				setDisplayPiece(" ");
				break;
			case 1:
				setDisplayPiece("X");
				break;
			case 2:
				setDisplayPiece("O");
				break;
			default:
				break;
		}
	}, [gameState]);

	return (
		<button
			className={displayPiece === " " ? "btn btn-square row-span-1 text-center align-middle bg-transparent h-5/6 w-5/6 border-none"
           : displayPiece === "X" ?  "btn btn-square btn-info row-span-1 text-center align-middle bg-slate-400 h-5/6 w-5/6 text-4xl"
        : "btn btn-square btn-error row-span-1 text-center align-middle bg-slate-400 h-5/6 w-5/6 text-4xl"}
			onClick={clickHandler}
		>
			{displayPiece}
		</button>
	);
};

export default GameSection;
