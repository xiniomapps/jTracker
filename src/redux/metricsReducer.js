import {
    ADD_METRIC,
    DEL_METRIC,
    DEL_ALL_METRICS,
    SELECT_METRIC,
    SAVE_METRIC_SETTINGS,
    UPDATE_METRIC_MIN_READING
} from './actions';
import moment from 'moment';

const initialState = {
    total: 0,
    selected: null,
    collection: {},
};

const defaultSettings = {
    /** allow charts to start from zero */
    fromZero: false,
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
                        goal: action.payload.goal,
                        units: action.payload.units,
                        reasons: action.payload.reasons,
                        settings: defaultSettings,
                        minReading: null,
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
        case SELECT_METRIC:
            return {
                ...state,
                selected: action.payload.id,
            };
        case SAVE_METRIC_SETTINGS: {
            let stateCopy = Object.assign({}, state);
            stateCopy.collection[action.payload.id].settings = action.payload.settings;
            return stateCopy;
        }
        case UPDATE_METRIC_MIN_READING: {
            let stateCopy = Object.assign({}, state);
            if (!action.payload.currentDate || moment(action.payload.newDate).isBefore(moment(action.payload.currentDate))){
                stateCopy.collection[action.payload.id].minReading = action.payload.newDate;
            }
            return stateCopy;
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

export const delMetric = (obj) => {
    return {
        type: DEL_METRIC,
        payload: obj,
    };
};

export const selectMetric = (obj) => {
    return {
        type: SELECT_METRIC,
        payload: obj,
    };
};

export const saveMetricSettings = (obj) => {
    return {
        type: SAVE_METRIC_SETTINGS,
        payload: obj,
    };
};

export const updateMetricMinReading = (obj) => {
    return {
        type: UPDATE_METRIC_MIN_READING,
        payload: obj,
    };
};