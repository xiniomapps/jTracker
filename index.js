/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { globalReduxStore, persistor } from './src/redux/Store';

const ReduxApp = () => (
    <StoreProvider store={globalReduxStore}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </StoreProvider>
);


AppRegistry.registerComponent(appName, () => ReduxApp);
