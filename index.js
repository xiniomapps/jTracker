/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as StoreProvider } from 'react-redux';
import globalReduxStore from './src/redux/Store';

const ReduxApp = () => (
    <StoreProvider store={globalReduxStore}>
        <App />
    </StoreProvider>
);


AppRegistry.registerComponent(appName, () => ReduxApp);
