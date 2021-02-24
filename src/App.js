import React, {useState, useEffect} from 'react';
import * as d3 from 'd3-timer';
import { Provider } from 'react-redux';
import Board from './components/Board/index.js'

import store from './redux/store';

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
        <Provider store={store}>
        <div className="App">
            <Board clock={clock}></Board>
        </div>
        </Provider>
    );
}

export default App;
