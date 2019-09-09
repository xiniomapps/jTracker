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
import MetricasScreen from './src/screens/MetricasScreen';
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

const drawerScreens = createDrawerNavigator(
    {
        Principal: MainScreen,
        Metricas: MetricasScreen,
    },
    {
        initialRouteName: 'Principal',
    }
);

const AppContainer = createAppContainer(createStackNavigator(
    {
        drawer: drawerScreens,
    },
    {
        initialRouteName: 'drawer',
        defaultNavigationOptions: navOptions,
    }
));

export default class App extends Component {
    render() {
        return (
            <AppContainer ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }} />
        );
    }
}
