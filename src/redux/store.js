import { combineReducers, createStore } from 'redux';
import board from './reducers/board';

const reducer = combineReducers({
    board
});

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;