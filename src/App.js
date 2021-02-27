import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Screens from './components/Screens/index';

import './scss/global.scss';

function App() {
    
    return (
        <Provider store={store}>
            <Screens />
        </Provider>
    );
}

export default App;
