import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rootSaga from '../sagas/rootSaga';
import metricsReducer from './metricsReducer';
import readingsReducer from '../redux/readingsReducer';
import userSettingsReducer from '../redux/userSettingsReducer';

const persistedReducer = persistReducer(
    {
        // Configuration
        key: 'root',
        storage: AsyncStorage,
    },
    combineReducers({
        // Reductores
        metrics: metricsReducer,
        readings: readingsReducer,
        userSettings: userSettingsReducer,
    })
);

const sagaMiddleware = createSagaMiddleware();
let globalReduxStore = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
));
let persistor = persistStore(globalReduxStore);
sagaMiddleware.run(rootSaga);

export {globalReduxStore, persistor};