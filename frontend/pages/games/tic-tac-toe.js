import { useState, useContext, useCallback } from 'react';

import {useTTTContext} from '../../contexts/TTTContext';

import Link from "next/link";
import GameSection from "../../components/GameSection";
import Grid from "../../components/Grid";

const TicTacToe = () => {
    
    const {gameState, dispatch} = useTTTContext();
    const { board, playerPiece } = gameState;
    const clickHandler = (piece) => {
        dispatch({type: `PLAYER_BUTTON`, piece: piece});
        
    }

    //#region 
    // const playerSymbolSwitch = () => {
    //     switch (playerSymbol) {
    //         case "X":
    //             setPlayerSymbol("O");
    //             break;
    //         case "O":
    //             setPlayerSymbol("X");
    //             break;
    //     }
    // }
    //#endregion

    return (
        <div className="container mx-auto my-20 w-96 h-96 flex-col justify-center align-middle content-center items-center">
            <h1 className="text-center text-6xl">Tic-Tac-Toe</h1>
            <div id="player-buttons" className="w-fit container mx-auto flex gap-4 py-5">
                <button className={`btn btn-square ${playerPiece === "X" && "btn-primary"}`} onClick={() => { clickHandler('X')}}>X</button>
                <button className={`btn btn-square ${playerPiece === "O" && "btn-primary"}`} onClick={() => { clickHandler('O') }}>O</button>
            </div>
            <Grid />
            <footer className="text-center">
                <Link href="/">
                    <a className="text-cyan-500 hover:text-cyan-900">
                        Click here for the home page
                    </a>
                </Link>
            </footer>
        </div>
    )
};

export default TicTacToe;