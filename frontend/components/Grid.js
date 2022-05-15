import { useTTTContext } from "../contexts/TTTContext";

import GameSection from "./GameSection";




const Grid = (props) => {
    const {gameState, dispatch} = useTTTContext();
    

    const { playerSymbol, onSelect } = props;


    console.log(gameState);

    return (
        <>
        <div className="grid grid-rows-3 grid-cols-3 gap-4 mx-auto h-5/6 py-5">
            <GameSection id="00" playerSymbol={playerSymbol} onSelect={()=> {onSelect()}} />
            <GameSection id="01" playerSymbol={playerSymbol} onSelect={()=> {onSelect()}} />
            <GameSection id="02" playerSymbol={playerSymbol} onSelect={()=> {onSelect()}} />
            <GameSection id="10" playerSymbol={playerSymbol} onSelect={()=> {onSelect()}} />
            <GameSection id="11" playerSymbol={playerSymbol} onSelect={()=> {onSelect()}} />
            <GameSection id="12" playerSymbol={playerSymbol} onSelect={()=> {onSelect()}} />
            <GameSection id="20" playerSymbol={playerSymbol} onSelect={()=> {onSelect()}} />
            <GameSection id="21" playerSymbol={playerSymbol} onSelect={()=> {onSelect()}} />
            <GameSection id="22" playerSymbol={playerSymbol} onSelect={()=> {onSelect()}} />
        </div>


        <button className="btn btn-warning">NEW GAME</button>
        </>
    )
}

export default Grid;