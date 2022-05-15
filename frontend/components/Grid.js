import { useReducer } from "react";

import {TTT} from "../controllers/Board";


function gridReducer(state, action) {
    switch (action.type) {
        case 'X':
            return;
        default: 
            return;
    }
}

const Grid = (props) => {
    const [gameState, dispatch] = useReducer(gridReducer, 0);


    return (
    <div className="grid grid-rows-3 grid-cols-3 gap-4 mx-auto h-5/6 py-5"> {props.children}</div>
    )
}

export default Grid;