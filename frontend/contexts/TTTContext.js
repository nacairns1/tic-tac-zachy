import { createContext, useContext, useReducer} from 'react';
import { Board } from "../controllers/Board.js";

const TTTContext = createContext();
const TTTBoard = new Board(3);

const gameStateReducer = (state, action) => {
    switch (action.type) {
        case "select_x":
            return {...state};
        case "select_o":
            return {...state};
        case "new_game":
            return {...state};
        default:
            return {...state};
    }
}


const TTTWrapper = ({ children }) => {    
    const [gameState, dispatch] = useReducer(gameStateReducer, {board: TTTBoard, victory: false, playerPiece:"DEFAULT"});
    const gameContextValue = () => {gameState, dispatch};
    return (
        <TTTContext.Provider value={gameContextValue}>
            {children}
        </TTTContext.Provider>
    );
}

const useTTTContext = () => {
    return useContext(TTTContext);
};


module.exports = { TTTWrapper, useTTTContext }