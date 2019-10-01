import {ADD_METRIC, DEL_METRIC} from './actions';
const initialState = {
    total: 0,
    collection: {},
};

export default function metricsReducer(state = initialState, action){
    switch (action.type){
        case ADD_METRIC: {
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
        case DEL_METRIC:
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

export const addMetric = (obj) => {
    return {
        type: ADD_METRIC,
        payload: obj,
    };
};

export const delMetric = () => {
    return {
        type: DEL_METRIC,
    };
};
