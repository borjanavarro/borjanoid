import React from 'react';
import { WAIT_SCREEN } from '../constants';

import './styles.scss'

function StartScreen({ setScreen }) {

    return (
        <div className="container">
            <div className="center-panel">
                <h1>Arkanoid</h1>
                <h3>The classic Arkanoid game</h3>
                <p className="instructions">use arrow keys to play</p>
                <div className="button-container">
                    <button onClick={ (e) => setScreen(WAIT_SCREEN) }>Start game</button>
                </div>
                <div className="bottom">
                    <h5>code & design by <a href="https://www.linkedin.com/in/borja-navarro-web/" target="_blank" rel="noreferrer">Borja Navarro</a></h5>
                </div>
            </div>
        </div>
    );
}

export default StartScreen;
