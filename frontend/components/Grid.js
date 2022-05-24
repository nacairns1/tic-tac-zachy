import { useTTTContext } from "../contexts/TTTContext";
import Modal from "./Modal";

import GameSection from "./GameSection";
import { useEffect } from "react";

const Grid = (props) => {
	const { gameState, dispatch } = useTTTContext();
	const clickHandler = () => {
		dispatch({ type: "NEW_GAME" });
	};
	const squares = [];

	for (let i = 0; i < 9; i++) {
		squares.push(
			<div
				key={`div for ${i}`}
				className="flex justify-center items-center col-span-1"
			>
				<GameSection key={`Square ${i}`} gameSquareId={i} />
			</div>
		);
	}

	return (
		<div className="flex flex-row justify-around w-full h-3/5">
			<div className=" w-2/5 h-full relative">
				<div className="grid grid-rows-3 grid-cols-3 mx-auto absolute -z-10 w-full h-full">
					<div className="col-span-1 border-4 border-r-black border-l-0 border-t-0 border-b-black" />
					<div className="col-span-1 border-4 border-l-black border-r-black border-t-0 border-b-black" />
					<div className="col-span-1 border-4 border-l-black border-b-black border-t-0 border-r-0" />
					<div className="col-span-1 border-4 border-r-black border-l-0 border-t-black border-b-black" />
					<div className="col-span-1 border-4 border-l-black border-r-black border-t-black border-b-black" />
					<div className="col-span-1 border-4 border-l-black border-b-black border-t-black border-r-0" />
					<div className="col-span-1 border-4 border-r-black border-l-0 border-t-black border-b-0" />
					<div className="col-span-1 border-4 border-l-black border-r-black border-t-black border-b-0" />
					<div className="col-span-1 border-4 border-l-black border-b-0 border-t-black border-r-0" />
				</div>
				<div className="grid grid-rows-3 grid-cols-3 gap-2 mx-auto w-full h-full absolute">
					{squares}
				</div>
			</div>

			<Modal />
		</div>
	);
};

export default Grid;
