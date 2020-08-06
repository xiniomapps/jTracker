
import { all, takeEvery, select, put } from 'redux-saga/effects';
import {INIT_APP, DEL_METRIC, ADD_READING} from '../redux/actions';
import {delAllMetricReadings} from '../redux/readingsReducer';
import {updateMetricMinReading} from '../redux/metricsReducer';
import * as RootNavigation from '../utils/RootNavigation';

export default function *rootSaga() {
    yield all([
        watchAndLog(),
        initAppWatcher(),
        delMetricWatcher(),
        addReadingWatcher(),
    ]);
}

function* watchAndLog(){
    yield takeEvery('*', function* logger(action){
        const state = yield select();
        // eslint-disable-next-line no-console
        console.log('** action', action);
        // eslint-disable-next-line no-console
        console.log('** state after', state);
    });
}

function* initAppWatcher(){
    yield takeEvery(INIT_APP, function initAppWorker(){
        console.log('Starting App');
    });
}

/**
 * Watch for any metric deletion to also delete readings
 */
function* delMetricWatcher(){
    yield takeEvery([DEL_METRIC, ], delMetricWorker);
}

function* delMetricWorker(action){
    //yield console.log(action.payload);
    yield put(delAllMetricReadings({
        id: action.payload.id,
    }));

    yield RootNavigation.navigate('MetricsScreen');
}

/**
 * Watch for new readings
 */
function* addReadingWatcher(){
    yield takeEvery([ADD_READING, ], addReadingWorker);
}

function* addReadingWorker(action){
    const state = yield select();
    yield put(updateMetricMinReading({
        id: action.payload.currentMetric,
        currentDate: state.metrics.collection[action.payload.currentMetric].minReading,
        newDate: action.payload.date,
    }));
}