import { useTTTContext } from "../contexts/TTTContext";
import Modal from "./Modal";


import GameSection from "./GameSection";




const Grid = (props) => {
    const {gameState, dispatch} = useTTTContext();
    const clickHandler = () => {
        dispatch({type: 'NEW_GAME'});
    }
    

    return (
        <>
        <div className="grid grid-rows-3 grid-cols-3 gap-4 mx-auto h-5/6 py-5">
            <GameSection id="00" row={0} col={0} />
            <GameSection id="01" row={0} col={1} />
            <GameSection id="02" row={0} col={2} />
            <GameSection id="10" row={1} col={0} />
            <GameSection id="11" row={1} col={1} />
            <GameSection id="12" row={1} col={2} />
            <GameSection id="20" row={2} col={0} />
            <GameSection id="21" row={2} col={1} />
            <GameSection id="22" row={2} col={2} />
        </div>
        <Modal />

        <button className="btn btn-warning mx-auto flex my-10" onClick={clickHandler}>NEW GAME</button>
        </>
    )
}

export default Grid;