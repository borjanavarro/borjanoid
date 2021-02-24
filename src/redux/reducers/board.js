import { UPDATE_DATA } from '../actions/actionTypes';

const initialState = {
    topMinPos: 20,
    topMaxPos: 600,
    leftMinPos: 20,
    leftMaxPos: 400,
    margin: 20
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DATA: 
            return {
                ...state,
                topMinPos: action.payload.topMinPos,
                topMaxPos: action.payload.topMaxPos,
                leftMinPos: action.payload.leftMinPos,
                leftMaxPos: action.payload.leftMaxPos,
                margin: action.payload.margin,
            }

        default:
            return state;
    }
}

export default reducer;

