import { UPDATE_DATA } from '../actions/actionTypes';

const initialState = {
    width: 40,
    height: 20
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
