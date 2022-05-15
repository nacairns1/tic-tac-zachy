import { useState } from "react";

const GameSection = (props) => {
    const [sectionPiece, setSectionPiece] = useState();
    const pieceHandler = () => {
        if (sectionPiece !== undefined) return;
        props.onSelect();
        setSectionPiece(props.playerSymbol);
    }

    return <button className="col-span-1 btn btn-accent row-span-1 text-center align-middle bg-slate-700 h-full"
        onClick={pieceHandler}> {sectionPiece === undefined ? "" : sectionPiece}</button>
}

export default GameSection;