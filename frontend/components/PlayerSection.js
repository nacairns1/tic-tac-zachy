
import { useEffect, useState } from 'react';
import {useTTTContext} from '../contexts/TTTContext';

const PlayerSection = (props) => {
    const {gameState, dispatch} =useTTTContext();
    const {playerX, playerO} = gameState;
    const [playerXUserId, setPlayerXUserId] = useState(' ');
    const [playerOUserId, setPlayerOUserId] = useState(' ');


    useEffect(()=>{
        
        if(!(playerX && playerO)) return;
        setPlayerXUserId(playerX.userId);
        setPlayerOUserId(playerO.userId);
    },[playerO, playerX]);
    


   
	return (
		<section className="flex flex-row md:flex-col justify-center items-center mx-auto md:ml-10 text-center w-4/5 md:w-1/6 place-self-center">
            <h2 className="card-title">{playerXUserId}</h2>
			<div
				className={`card bg-info items-center justify-center w-1/3 md:w-1/2 text-neutral text-center rounded-lg py-3`}
			>
				
				<div className="card-content text-3xl md:text-5xl text-base-100">X</div>
			</div>
			<div className="divider divider-horizontal md:divider-vertical">
				{gameState.draw ? "DRAW" : "VS"}
			</div>
            <h2 className="card-title">{playerOUserId}</h2>
			<div
				className={`card bg-error items-center justify-center w-1/3 md:w-1/2 text-neutral text-center rounded-lg py-3`}
			>
				<span className="text-3xl md:text-5xl card-content text-base-100 ">O </span>
			</div>
		</section>
	);
};



module.exports = {PlayerSection};
