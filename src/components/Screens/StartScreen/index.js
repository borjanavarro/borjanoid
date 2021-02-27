import React from 'react';
import { GAME_SCREEN } from '../constants';

import './styles.scss'

function StartScreen({ setScreen }) {

    return (
        <div className="container">
            <div className="center-panel">
                <h1>Arkanoid</h1>
                <h3>The classic Arkanoid game</h3>
                <button onClick={ (e) => setScreen(GAME_SCREEN) }>Start game</button>
                <div className="bottom">
                    <h5>code & design by <a href="https://www.linkedin.com/in/borja-navarro-web/" target="_blank" rel="noreferrer">Borja Navarro</a></h5>
                </div>
            </div>
        </div>
    );
}

export default StartScreen;
