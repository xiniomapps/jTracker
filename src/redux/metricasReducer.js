import {ADD_METRICA, DEL_METRICA} from './actions';
const initialState = {
    total: 0,
    metricas: {},
};

export default function metricasReducer(state = initialState, action){
    switch (action.type){
        case ADD_METRICA:
            return {
                total: state.total + 1,
            };
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

export const addMetrica = () => {
    return {
        type: ADD_METRICA,
    };
};

export const delMetrica = () => {
    return {
        type: DEL_METRICA,
    };
};
