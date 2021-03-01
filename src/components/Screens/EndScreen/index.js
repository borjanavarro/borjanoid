import React from 'react';
import { START_SCREEN } from '../constants';

import './styles.scss'

function EndScreen({ setScreen, message, submessage}) {

    return (
        <div className="end-container">
            <h1>{ message}</h1>
            <h3>{ submessage }</h3>
            <button onClick={ () => setScreen(START_SCREEN) }>Retry</button>
        </div>
    );
}

export default EndScreen;
