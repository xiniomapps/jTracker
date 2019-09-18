import {ADD_METRICA, DEL_METRICA} from './actions';
const initialState = {
    total: 0,
    collection: {},
};

export default function metricasReducer(state = initialState, action){
    switch (action.type){
        case ADD_METRICA: {
            let index = state.total + 1;
            return {
                ...state,
                total: index,
                collection: {
                    ...state.collection,
                    [index]: {
                        name: action.payload.name,
                        creationDate: Date.now(),
                        objective: action.payload.objective,
                    },
                },
            };
        }
        case DEL_METRICA:
            if (state.total >= 1) {
                return {
                    ...state,
                    total: state.total - 1,
                };
            }
            else {
                return state;
            }
        default:
            return state;
    }
}

export const addMetrica = (obj) => {
    return {
        type: ADD_METRICA,
        payload: obj,
    };
};

export const delMetrica = () => {
    return {
        type: DEL_METRICA,
    };
};
