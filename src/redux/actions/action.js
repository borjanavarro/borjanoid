import { UPDATE_DATA } from './actionTypes';

const updateData = data => {
    return {
        type: UPDATE_DATA,
        payload: data
    }
};

export default updateData;