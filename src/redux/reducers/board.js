import { UPDATE_DATA } from '../actions/actionTypes';
import { updateObjectIfNeeded } from '../../utils/functions';

const initialState = {
    topMinPos: 0,
    topMaxPos: 600,
    leftMinPos: 0,
    leftMaxPos: 400,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DATA: 
            return updateObjectIfNeeded(state, action.payload);

        default:
            return state;
    }
}

export default reducer;

