import { useState } from 'react';

import Link from "next/link";
import GameSection from "../../components/game-section";
import Grid from "../../components/grid";

const TicTacToe = () => {
    const [playerSymbol, setPlayerSymbol] = useState('X');

    const playerSymbolHandler = (symbol) => {
        setPlayerSymbol(symbol);
    }

    const playerSymbolSwitch = () => {
        switch (playerSymbol) {
            case "X":
                setPlayerSymbol("O");
                break;
            case "O":
                setPlayerSymbol("X");
                break;
        }
    }

    return (
        <div className="container mx-auto my-20 w-96 h-96 flex-col justify-center align-middle content-center items-center">
            <h1 className="text-center text-6xl">Tic-Tac-Toe</h1>
            <div id="player-buttons" className="w-fit container mx-auto flex gap-4 py-5">
                <button className={`btn btn-square ${playerSymbol === "X" && "btn-primary"}`} onClick={() => { playerSymbolHandler("X") }}>X</button>
                <button className={`btn btn-square ${playerSymbol === "O" && "btn-primary"}`} onClick={() => { playerSymbolHandler("O") }}>O</button>
            </div>
            <Grid>
                <GameSection id="00" playerSymbol={playerSymbol} onSelect={ playerSymbolSwitch} />
                <GameSection id="01" playerSymbol={playerSymbol} onSelect={ playerSymbolSwitch} />
                <GameSection id="02" playerSymbol={playerSymbol} onSelect={ playerSymbolSwitch} />
                <GameSection id="10" playerSymbol={playerSymbol} onSelect={ playerSymbolSwitch} />
                <GameSection id="11" playerSymbol={playerSymbol} onSelect={ playerSymbolSwitch} />
                <GameSection id="12" playerSymbol={playerSymbol} onSelect={ playerSymbolSwitch} />
                <GameSection id="20" playerSymbol={playerSymbol} onSelect={ playerSymbolSwitch} />
                <GameSection id="21" playerSymbol={playerSymbol} onSelect={ playerSymbolSwitch} />
                <GameSection id="22" playerSymbol={playerSymbol} onSelect={ playerSymbolSwitch} />
            </Grid>
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