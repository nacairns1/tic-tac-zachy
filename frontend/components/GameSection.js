import { useState, useMemo, useCallback } from "react";
import { useTTTContext } from "../contexts/TTTContext";


const GameSection = (props) => {
    const [sectionPiece, setSectionPiece] = useState(" ");
    const { gameState, dispatch } = useTTTContext();
    const { board, playerPiece } = gameState;
    const { row, col } = props;


    const clickHandler = useCallback(() => {
        dispatch({type: `SELECT_${playerPiece}`, row: row, col: col});
        setSectionPiece(playerPiece);
    }, [playerPiece]);

    return <button className="col-span-1 btn btn-accent row-span-1 text-center align-middle bg-slate-700 h-full"
        onClick={clickHandler}> { sectionPiece }</button>
}

export default GameSection;