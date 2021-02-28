import { combineReducers, createStore } from 'redux';
import board from './reducers/board';
import ball from './reducers/ball';
import player from './reducers/player';
import brick from './reducers/brick';
import wall from './reducers/wall';

const reducer = combineReducers({
    board,
    ball,
    player,
    brick,
    wall
});

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;