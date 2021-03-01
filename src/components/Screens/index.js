import React, { useState, useEffect } from 'react';
import StartScreen from './StartScreen/index';
import EndScreen from './EndScreen/index';
import GameScreen from './GameScreen/index';
import WaitScreen from './WaitScreen/index';
import useKeyboard from '../../utils/Keyboard';
import * as SCREENS from './constants'; 

function Screens() {
    const [screen, setScreen] = useState(SCREENS.START_SCREEN);
    const [endGame, setEndGame] = useState(false);
    const [message, setMessage] = useState('');
    const [submessage, setSubmessage] = useState('');
    const keyDown = useKeyboard();

    useEffect(() => {
        if ( endGame ) {
            setMessage(endGame.message);
            setSubmessage(endGame.submessage);
            setScreen(SCREENS.END_SCREEN);
            setEndGame(false);
        }
    }, [endGame]);

    switch (screen) {
        case SCREENS.START_SCREEN:
            return (
                <StartScreen setScreen={setScreen} />
            );

        case SCREENS.WAIT_SCREEN:
            return (
                <WaitScreen setScreens={setScreen} />
            );
        
        case SCREENS.GAME_SCREEN:
            return (
                <GameScreen keyDown={keyDown} setEndGame={setEndGame} />
            );

        case SCREENS.END_SCREEN:
            return (
                <EndScreen setScreen={setScreen} message={message} submessage={submessage} />
            );

        default:
            return (
                <StartScreen />
            )
    }
}

export default Screens;
