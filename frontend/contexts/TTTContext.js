import { createContext, useContext, useReducer } from 'react';
import { Board } from "../controllers/Board.js";

const TTTContext = createContext();


const gameStateReducer = (state, action) => {
    const { row, col, piece } = action;
    console.log(state.board);
    switch (action.type) {
        case "SELECT_X":
            if (!state.board.isEmpty(row, col)) return { ...state };
            state.board.toggleX(row, col);
            if (state.board.isSolvedX) state.x_victory=true;
            state.playerPiece = "O";
            return { ...state};
        case "SELECT_O":
            if (!state.board.isEmpty(row, col)) return { ...state };
            console.log(`dispatch seen for O on ${row} and ${col}. Curr value: ${state.board.board[row][col]}`);
            state.board.toggleO(row, col);
            if (state.board.isSolvedO) state.o_victory=true;
            state.playerPiece = "X";
            return { ...state};
        case "NEW_GAME":
            state.board.clear();
            console.log("New Game Started");
            return { ...state };
        case "PLAYER_BUTTON":
            console.log(`switching pieces... to ${piece}`);
            return { ...state, playerPiece: piece };
        default:
            return { ...state };
    }
}


const TTTWrapper = ({ children }) => {
    const [gameState, dispatch] = useReducer(gameStateReducer, { board: new Board(3, 3), x_victory: false, o_victory: false, playerPiece: " " });
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