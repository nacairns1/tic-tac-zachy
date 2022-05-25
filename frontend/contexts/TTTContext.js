import { createContext, useContext, useReducer } from "react";
import { Board } from "../controllers/Board.js";
import Router from "next/router";

const TTTContext = createContext();

const gameStateReducer = (state, action) => {
	const { gameSquareId, piece } = action;
    let squares;
	switch (action.type) {
		case "SELECT_X":
			if (!state.board.isEmpty(gameSquareId)) return { ...state };
			squares = state.board.toggleX(gameSquareId);
			if (state.board.isSolvedX) {
                state.x_victory = true;
                state.winning_squares = squares;
            }
			state.playerPiece = "O";
            state.numMoves++;
			return { ...state };
		case "SELECT_O":
			if (!state.board.isEmpty(gameSquareId)) return { ...state };
			squares = state.board.toggleO(gameSquareId);
			if (state.board.isSolvedO) {
                state.o_victory = true;
                state.winning_squares = squares;
            }
			state.playerPiece = "X";
            state.numMoves++;
			return { ...state };
        case "DRAW":
            state.draw = true;
            return {...state};
		case "NEW_GAME":
			state.board.clear();
			state.playerPiece = "X";
			state.o_victory = false;
			state.x_victory = false;
            state.draw = false;
            state.winning_squares = [];
            state.numMoves=0;
			return { ...state };
		case "PLAYER_BUTTON":
			return { ...state, playerPiece: piece };
		default:
			return { ...state };
	}
};

const TTTWrapper = ({ children }) => {
	const [gameState, dispatch] = useReducer(gameStateReducer, {
		board: new Board(3, 3),
		x_victory: false,
		o_victory: false,
        draw: false,
		playerPiece: "X",
		winning_squares: [],
        numMoves: 0
	});
	const gameContextValue = () => {
		return { gameState, dispatch };
	};
	return (
		<TTTContext.Provider value={gameContextValue()}>
			{children}
		</TTTContext.Provider>
	);
};

const useTTTContext = () => {
	return useContext(TTTContext);
};

module.exports = { TTTWrapper, useTTTContext };
