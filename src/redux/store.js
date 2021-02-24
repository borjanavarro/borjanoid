import { combineReducers, createStore } from 'redux';
import board from './reducers/board';
import ball from './reducers/ball';
import player from './reducers/player';

const reducer = combineReducers({
    board,
    ball,
    player
});

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;