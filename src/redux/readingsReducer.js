import { ADD_READING, DEL_READING, DEL_ALL_READINGS } from './actions';

const initialState = {

};

export default function readingsReducer(state = initialState, action){
    switch (action.type){
        case ADD_READING: {
            return {
                ...state,
                [action.payload.index]: {
                    ...state[action.payload.index],
                    [action.payload.date]: {
                        value: action.payload.value,
                        comments: action.payload.comments,
                    },
                },
            };
        }
        case DEL_READING: {
            return state;
        }
        case DEL_ALL_READINGS:
            return initialState;
        default:
            return state;
    }
}

export const addReading = (obj) => {
    return {
        type: ADD_READING,
        payload: obj,
    };
};

export const delReading = () => {
    return {
        type: DEL_READING,
    };
};