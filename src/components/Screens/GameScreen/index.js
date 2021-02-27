import React, { useState, useEffect } from 'react';
import Board from '../../Board/index';

// import './styles.scss'

function GameScreen({keyDown}) {
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if ( keyDown === 'Esc' ) {
            setPause( pause ? false: true);
        }
    }, [keyDown, pause])

    return (
        <Board keyDown={keyDown} />
    );
}

export default GameScreen;