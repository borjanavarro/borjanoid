import React, { useState, useEffect } from 'react';
import StartScreen from './StartScreen/index';
import EndScreen from './EndScreen/index';
import Board from '../Board/index';
import useKeyboard from '../../utils/Keyboard';

function Screens() {
    const [screen, setScreen] = useState(1);
    const keyDown = useKeyboard();

    useEffect(() => {
        if ( screen === 1 ) {
            if ( keyDown === 'Digit1') {
                setScreen(1);
            } else if (keyDown === 'Digit2') {
                setScreen(2);
            }
        }
    }, [keyDown, screen]);

    switch (screen) {
        case 1:
            return (
                <StartScreen />
            );
        
        case 2:
            return (
                <Board />
            );

        case 3:
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
