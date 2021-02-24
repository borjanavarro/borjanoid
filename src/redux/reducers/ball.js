import { UPDATE_DATA } from '../actions/actionTypes';

const initialState = {
    size: 20,
    velocity: 5
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DATA: 
            return state;

        default:
            return state;
    }
}

export default reducer;