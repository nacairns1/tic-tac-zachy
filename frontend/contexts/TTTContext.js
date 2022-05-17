import { createContext, useContext, useReducer } from 'react';
import { Board } from "../controllers/Board.js";
import Router from 'next/router';


const TTTContext = createContext();


const gameStateReducer = (state, action) => {
    const { row, col, piece } = action;
    switch (action.type) {
        case "SELECT_X":
            if (!state.board.isEmpty(row, col)) return { ...state };
            state.board.toggleX(row, col);
            if (state.board.isSolvedX) state.x_victory=true;
            state.playerPiece = "O";
            return { ...state};
        case "SELECT_O":
            if (!state.board.isEmpty(row, col)) return { ...state };
            state.board.toggleO(row, col);
            if (state.board.isSolvedO) state.o_victory=true;
            state.playerPiece = "X";
            return { ...state};
        case "NEW_GAME":
            state.board = new Board(3,3);
            state.playerPiece = "X";
            state.o_victory = false;
            state.x_victory = false;
            return { ...state };
        case "PLAYER_BUTTON":
            console.log(`switching pieces... to ${piece}`);
            return { ...state, playerPiece: piece };
        default:
            return { ...state };
    }
}


const TTTWrapper = ({ children }) => {
    const [gameState, dispatch] = useReducer(gameStateReducer, { board: new Board(3, 3), x_victory: false, o_victory: false, playerPiece: "X" });
    const gameContextValue = () => {
        return { gameState, dispatch }
    };
    return (
        <TTTContext.Provider value={gameContextValue()}>
            {children}
        </TTTContext.Provider>
    );
}

const useTTTContext = () => {
    return useContext(TTTContext);
};


module.exports = { TTTWrapper, useTTTContext }