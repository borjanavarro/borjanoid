import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { WAIT_SCREEN } from '../constants';

import './styles.scss'

function StartScreen({ setScreen }) {
    const [message, setMessage] = useState('');
    const boardData = useSelector(state => state.board);
    let height = boardData.topMaxPos - boardData.topMinPos;
    let width = boardData.leftMaxPos - boardData.leftMinPos;

    const startButton = () => {
        if ( window.innerHeight > height && window.innerWidth > width + 2 * 280 ) {
            setScreen(WAIT_SCREEN)
        } else {
            setMessage("Your device hasn't enough resolution to play this game");
        }
    }

    return (
        <div className="start-container">
            <div className="center-panel">
                <h1>Arkanoid</h1>
                <h3>The classic Arkanoid game</h3>
                <p className="instructions">use arrow keys to play</p>
                <button onClick={ startButton }>Start game</button>
                <p className="error">{ message }</p>
                <div className="bottom">
                    <h5>code & design by <a href="https://www.linkedin.com/in/borja-navarro-web/" target="_blank" rel="noreferrer">Borja Navarro</a></h5>
                </div>
            </div>
        </div>
    );
}

export default StartScreen;
