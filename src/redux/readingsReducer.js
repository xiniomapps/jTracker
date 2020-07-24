import { ADD_READING, DEL_READING, DEL_ALL_METRIC_READINGS, DEL_ALL_READINGS } from './actions';
import moment from 'moment';

const initialState = {

};

export default function readingsReducer(state = initialState, action){
    switch (action.type){
        case ADD_READING: {
            let date = moment(action.payload.date);
            let year = date.format('YYYY');
            let month = date.format('MM');
            let day = date.format('DD');

            // Create copy of current state
            let stateCopy = Object.assign({}, state);

            // add index if not exists
            if (!(action.payload.currentMetric in stateCopy)){
                stateCopy[action.payload.currentMetric] = {};
            }

            // add year if not exists
            if (!(year in stateCopy[action.payload.currentMetric])){
                stateCopy[action.payload.currentMetric][year] = {};
            }

            // add month if not exists
            if (!(month in stateCopy[action.payload.currentMetric][year])){
                stateCopy[action.payload.currentMetric][year][month] = {};
            }
            return {
                ...stateCopy,
                [action.payload.currentMetric]: {
                    ...stateCopy[action.payload.currentMetric],
                    [year]: {
                        ...stateCopy[action.payload.currentMetric][year],
                        [month]: {
                            ...stateCopy[action.payload.currentMetric][year][month],
                            [day]: {
                                value: action.payload.value,
                                comments: action.payload.comments,
                            },
                        },
                    },
                },
            };
        }
        case DEL_READING: {
            return state;
        }
        case DEL_ALL_METRIC_READINGS: {
            let stateCopy = Object.assign({}, state);
            console.log(stateCopy);
            delete stateCopy[action.payload.id];
            return stateCopy;
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

export const delAllMetricReadings = (obj) => {
    return {
        type: DEL_ALL_METRIC_READINGS,
        payload: obj,
    };
};

export const delReading = () => {
    return {
        type: DEL_READING,
    };
};