
import { all, takeEvery, select } from 'redux-saga/effects';
import {INIT_APP} from '../redux/actions';

export default function *rootSaga() {
    yield all([
        watchAndLog(),
        initAppWatcher(),
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