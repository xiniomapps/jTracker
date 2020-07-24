
import { all, takeEvery, select, put } from 'redux-saga/effects';
import {INIT_APP, DEL_METRIC} from '../redux/actions';
import {delAllMetricReadings} from '../redux/readingsReducer';
import * as RootNavigation from '../utils/RootNavigation';

export default function *rootSaga() {
    yield all([
        watchAndLog(),
        initAppWatcher(),
        delMetricWatcher(),
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