import React, {useState, useEffect} from 'react';
import * as d3 from 'd3-timer';
import Ball from './components/Ball/index.js';

import './scss/global.scss';

function App() {
    const [clock, setClock] = useState('tick');

    useEffect(() => {
        const t = d3.timer(() => {
            setClock( clock === 'tick' ? 'tack' : 'tick');
        });
        // window.addEventListener("keydown", movePlatform, false);

        return () => t.stop();
    })

    return (
        <div className="App">
            <div className="container">
                <Ball clock={clock}/>
                
            </div>
        </div>
    );
}

export default App;
