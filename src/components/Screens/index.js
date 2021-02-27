import React, { useState, useEffect } from 'react';
import StartScreen from './StartScreen/index';
import EndScreen from './EndScreen/index';
import GameScreen from './GameScreen/index';
import useKeyboard from '../../utils/Keyboard';
import * as SCREENS from './constants'; 

function Screens() {
    const [screen, setScreen] = useState(SCREENS.START_SCREEN);
    const keyDown = useKeyboard();

    useEffect(() => {
        if ( screen === SCREENS.START_SCREEN ) {
            if ( keyDown === 'Digit1') {
                setScreen(SCREENS.START_SCREEN);
            } else if (keyDown === 'Digit2') {
                setScreen(SCREENS.GAME_SCREEN);
            }
        }
    }, [keyDown, screen]);

    switch (screen) {
        case SCREENS.START_SCREEN:
            return (
                <StartScreen setScreen={setScreen} />
            );
        
        case SCREENS.GAME_SCREEN:
            return (
                <GameScreen keyDown={keyDown} />
            );

        case SCREENS.END_SCREEN:
            return (
                <EndScreen />
            );

        default:
            return (
                <StartScreen />
            )
    }
}

export default Screens;
