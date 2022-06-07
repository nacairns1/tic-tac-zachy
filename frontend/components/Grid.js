import { useTTTContext } from "../contexts/TTTContext";
import Modal from "./Modal";

import GameSection from "./GameSection";
import { useEffect } from "react";

const Grid = (props) => {
	const { gameState, dispatch } = useTTTContext();

  const {numMoves} = gameState;

	const squares = [];

	for (let i = 0; i < 9; i++) {
		squares.push(
			<div
				key={`grid square ${i}`}
				className="flex justify-center items-center col-span-1"
			>
				<GameSection key={`Square ${i}`} gameSquareId={i} />
			</div>
		);
	}

  useEffect(()=>{
    if (numMoves === 9 && (gameState.x_victory === gameState.o_victory)) {
      dispatch({type: "DRAW"});
    }
  },[numMoves]);

	return (
		<div className="hero flex flex-row h-[18rem] w-[20rem] md:w-[28rem] md:h-[24rem] lg:w-[36rem] lg:h-[30rem] xl:h-[36rem] xl:w-[42rem] mx-auto">
			<div className="hero-content w-full h-full relative">
				<div className="grid grid-rows-3 grid-cols-3 mx-auto absolute -z-10 w-5/6 h-5/6">
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
				<div className="grid grid-rows-3 grid-cols-3 gap-2 mx-auto w-5/6 h-5/6 absolute">
					{squares}
				</div>
			</div>

			{/* <Modal /> */}
		</div>
	);
};

export default Grid;
