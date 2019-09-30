import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import rootSaga from '../sagas/rootSaga';
import metricasReducer from '../redux/metricasReducer';
import readingsReducer from '../redux/readingsReducer';


const persistedReducer = persistReducer(
    {
        // Configuration
        key: 'root',
        storage: AsyncStorage,
    },
    combineReducers({
        // Reductores
        metricas: metricasReducer,
        readings: readingsReducer,
    })
);

const sagaMiddleware = createSagaMiddleware();
let globalReduxStore = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
));
let persistor = persistStore(globalReduxStore);
sagaMiddleware.run(rootSaga);

export {globalReduxStore, persistor};