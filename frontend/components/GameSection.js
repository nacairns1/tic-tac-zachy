import { useState, useCallback, useEffect } from "react";
import { useTTTContext } from "../contexts/TTTContext";


const GameSection = (props) => {
    const [displayPiece, setDisplayPiece] = useState(" ");
    const { gameState, dispatch } = useTTTContext();
    const { board, playerPiece } = gameState;
    const { row, col } = props;

    const clickHandler = () => {
        dispatch({type: `SELECT_${playerPiece}`, row: row, col: col});
        if (board.isEmpty(row,col)) setDisplayPiece(playerPiece);
    }

    const clearingManager = useEffect(()=>{
        if (!gameState.x_victory && !gameState.o_victory) setDisplayPiece(" ");
    },[gameState.x_victory, gameState.o_victory]);

    return <button className="col-span-1 btn btn-accent row-span-1 text-center align-middle bg-slate-700 h-full"
        onClick={clickHandler}> { displayPiece }</button>
}

export default GameSection;