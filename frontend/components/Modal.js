import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';

import { useTTTContext } from "../contexts/TTTContext";

const Modal = (props) => {
    let [isOpen, setIsOpen] = useState(false);
    let [text, setText] = useState('');

    const {gameState, dispatch} = useTTTContext();
    const {x_victory, o_victory} = gameState;

    const buttonHandler = () => {
        dispatch({type: 'NEW_GAME'});
        setIsOpen(false);
    }

    useEffect(()=>{
        if (x_victory) {
            setText( `Victory for X!`)
            return setIsOpen(true);
        };
        if (o_victory) {
            setText( `Victory for O!`)
            return setIsOpen(true);
        };
    },[x_victory, o_victory]);


    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4 -translate-y-1/4">
                <Dialog.Panel className="mx-auto max-w-sm bg-slate-200 text-center w-1/4 h-1/4 flex flex-col align-center items-center justify-around rounded-md">
                    <Dialog.Title>GAME OVER!</Dialog.Title>
                    <Dialog.Description>
                        {text}
                    </Dialog.Description>
                    <button className="btn flex w-1/2" onClick={buttonHandler}>New Game</button>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default Modal;

