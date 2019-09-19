import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../sagas/rootSaga';
import metricasReducer from '../redux/metricasReducer';
import readingsReducer from '../redux/readingsReducer';

const rootReducer = combineReducers(
    {
        metricas: metricasReducer,
        readings: readingsReducer,
    }
);

const sagaMiddleware = createSagaMiddleware();
const globalReduxStore = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga);
export default globalReduxStore;