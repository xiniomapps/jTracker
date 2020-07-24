import {ADD_METRIC, DEL_METRIC, DEL_ALL_METRICS} from './actions';
const initialState = {
    total: 0,
    collection: {},
};

export default function metricsReducer(state = initialState, action){
    switch (action.type){
        case ADD_METRIC: {
            let date = Date.now();
            return {
                ...state,
                total: state.total + 1,
                collection: {
                    ...state.collection,
                    [date]: {
                        name: action.payload.name,
                        creationDate: date,
                        objective: action.payload.objective,
                    },
                },
            };
        }
        case DEL_METRIC:
            if (state.total >= 1) {
                let stateCopy = Object.assign({}, state);
                // delete from metrics, readings is called from saga
                delete stateCopy.collection[action.payload.id];
                return {
                    ...stateCopy,
                    total: state.total - 1,
                };
            }
            else {
                return state;
            }
        case DEL_ALL_METRICS:
            return initialState;
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

export const delMetric = (obj) => {
    return {
        type: DEL_METRIC,
        payload: obj,
    };
};
