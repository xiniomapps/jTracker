import {
    ADD_METRIC,
    UPDATE_METRIC,
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
            let id = Date.now();
            return {
                ...state,
                total: state.total + 1,
                collection: {
                    ...state.collection,
                    [id]: {
                        name: action.payload.name,
                        creationDate: id,
                        goal: action.payload.goal,
                        units: action.payload.units,
                        reasons: action.payload.reasons,
                        settings: defaultSettings,
                        minReading: null,
                    },
                },
            };
        }
        case UPDATE_METRIC: {
            if ('id' in action.payload && action.payload.id){
                return {
                    ...state,
                    collection: {
                        ...state.collection,
                        [action.payload.id]: {
                            ...state.collection[action.payload.id],
                            name: action.payload.name,
                            goal: action.payload.goal,
                            units: action.payload.units,
                            reasons: action.payload.reasons,
                        },
                    },
                };
            }
            return state;
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

/**
 * addMetric
 * @param {Object} obj containing metrics data
 * @param {string} obj.name metric's name
 * @param {string} obj.goal numeric goal
 * @param {string} obj.units units for the goal (e.g Kg)
 * @param {string} obj.reasons Personal reasons
 */
export const addMetric = (obj) => {
    return {
        type: ADD_METRIC,
        payload: obj,
    };
};

/**
 * updateMetric
 * @param {Object} obj containing metrics data
 * @param {string} obj.id metric id
 * @param {string} obj.name metric name
 * @param {string} obj.goal numeric goal
 * @param {string} obj.units units for the goal (e.g Kg)
 * @param {string} obj.reasons Personal reasons
 */
export const updateMetric = (obj) => {
    return {
        type: UPDATE_METRIC,
        payload: obj,
    };
};

/**
 * delMetric
 * @param {Object} obj
 * @param {String} obj.id metric id
 */
export const delMetric = (obj) => {
    return {
        type: DEL_METRIC,
        payload: obj,
    };
};

/**
 * selectMetric
 * Saves the currently selected metric to have easy access to its id
 * @param {Object} obj
 */
export const selectMetric = (obj) => {
    return {
        type: SELECT_METRIC,
        payload: obj,
    };
};

/**
 * saveMetricSettings
 * @param {Object} obj
 */
export const saveMetricSettings = (obj) => {
    return {
        type: SAVE_METRIC_SETTINGS,
        payload: obj,
    };
};

/**
 * updateMetricMinReading
 * @param {Object} obj
 */
export const updateMetricMinReading = (obj) => {
    return {
        type: UPDATE_METRIC_MIN_READING,
        payload: obj,
    };
};