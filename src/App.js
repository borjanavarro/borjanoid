import React from 'react';
import { Provider } from 'react-redux';
import Board from './components/Board/index.js'

import store from './redux/store';

import './scss/global.scss';

function App() {

    return (
        <Provider store={store}>
        <div className="App">
            <Board></Board>
        </div>
        </Provider>
    );
}

export default App;
