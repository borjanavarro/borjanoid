import { UPDATE_DATA } from '../actions/actionTypes';

const initialState = {
    topOffset: 80,
    leftOffset: 0
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
