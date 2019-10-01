/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator} from 'react-navigation-stack';
import NavigationService from './src/utils/NavigatorService';
import MainScreen from './src/screens/MainScreen';
import MetricsScreen from './src/screens/MetricsScreen';
import addMetricScreen from './src/screens/addMetricScreen';
import MetricDetailsScreen from './src/screens/MetricDetailsScreen';
import AddReadingScreen from './src/screens/AddReadingScreen';
import ReadingDetailsScreen from './src/screens/ReadingDetailsScreen';
import { Icon } from 'react-native-elements';

const navOptions = ({navigation, }) => {
    return {
        title: 'jTracker',
        gesturesEnabled: true,
        headerStyle: {
            backgroundColor: '#069',
        },
        headerTintColor: '#f0f0f0',
        headerLeft: (
            <Icon
                name='menu'
                type='material'
                color='#f0f0f0'
                onPress={() => navigation.toggleDrawer()}
            />
        ),
    };
};

const principalStack = createStackNavigator(
    {
        MainScreen,
    },
    {
        defaultNavigationOptions: navOptions,
    }
);

const metricsStack = createStackNavigator(
    {
        MetricsScreen,
        addMetricScreen,
        MetricDetailsScreen,
        AddReadingScreen,
        ReadingDetailsScreen,
    },
    {
        defaultNavigationOptions: navOptions,
    }
);

const drawer = createDrawerNavigator(
    {
        Principal: principalStack,
        Metrics: metricsStack,
    },
    {
        initialRouteName: 'Principal',
    }
);
const AppContainer = createAppContainer(drawer);


export default class App extends Component {
    render() {
        return (
            <AppContainer ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }} />
        );
    }
}
