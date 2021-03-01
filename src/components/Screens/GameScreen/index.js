import React from 'react';
import Board from '../../Board/index';

// import './styles.scss'

function GameScreen({ setEndGame }) {

    return (
        <Board setEndGame={setEndGame} />
    );
}

export default GameScreen;