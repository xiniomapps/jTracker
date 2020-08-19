
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/utils/RootNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { nm } from './src/styles/globalStyles';

import AboutScreen from './src/screens/AboutScreen';
import AddMetricScreen from './src/screens/AddMetricScreen';
import AddReadingScreen from './src/screens/AddReadingScreen';
import EditMetricScreen from './src/screens/EditMetricScreen';
import FlashMessage from 'react-native-flash-message';
import MetricDetailsScreen from './src/screens/MetricDetailsScreen';
import MetricsScreen from './src/screens/MetricsScreen';
import MetricSettingsScreen from './src/screens/MetricSettingsScreen';
import UserSettingsScreen from './src/screens/UserSettingsScreen';
import LicensesScreen from './src/screens/LicensesScreen';

const UserSettingsStack = createStackNavigator();
function UserSettingsStackScreen(){
    return (
        <UserSettingsStack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#069', },
            headerTintColor: '#fff',
        }}>
            <MetricsStack.Screen name='User Settings' component={UserSettingsScreen} />
        </UserSettingsStack.Navigator>
    );
}

const MetricsStack = createStackNavigator();
function MetricsStackScreen() {
    return (
        <MetricsStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#069', },
                headerTintColor: '#fff',
            }}>
            <MetricsStack.Screen name='MetricsScreen' component={MetricsScreen} options={{ title: 'My Metrics', }} />
            <MetricsStack.Screen name='AddMetricScreen' component={AddMetricScreen} options={{ title: 'New Metric', }}/>
            <MetricsStack.Screen name='EditMetricScreen' component={EditMetricScreen} options={{ title: 'Edit Metric', }}/>
            <MetricsStack.Screen name='MetricDetailsScreen' component={MetricDetailsScreen} options={{ title: 'Metric Details', }}/>
            <MetricsStack.Screen name='MetricSettingsScreen' component={MetricSettingsScreen} />
            <MetricsStack.Screen name='AddReadingScreen' component={AddReadingScreen} />
        </MetricsStack.Navigator>
    );
}

const AboutStack = createStackNavigator();
function AboutStackScreen(){
    return (
        <AboutStack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#069', },
            headerTintColor: '#fff',
        }}>
            <MetricsStack.Screen name='About' component={AboutScreen} options={{ title: 'About jTracker', }}/>
            <MetricsStack.Screen name='LicensesScreen' component={LicensesScreen} options={{ title: 'Other Licenses', }}/>
        </AboutStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Tab.Navigator
                tabBarOptions={{
                    style: { backgroundColor: '#069', },
                    activeTintColor: '#fff',
                    inactiveTintColor: '#aaa',
                    showLabel: false,
                }}
            >
                <Tab.Screen
                    name='My Metrics'
                    component={MetricsStackScreen}
                    options={{
                        // eslint-disable-next-line react/display-name, react/prop-types
                        tabBarIcon: ({color, }) => (
                            <Icon type='material-community' name='chart-timeline-variant' color={color} size={nm(20)}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name='User'
                    component={UserSettingsStackScreen}
                    options={{
                        // eslint-disable-next-line react/display-name, react/prop-types
                        tabBarIcon: ({color, }) => (
                            <Icon type='material' name='person' color={color} size={nm(20)}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name='About'
                    component={AboutStackScreen}
                    options={{
                        // eslint-disable-next-line react/display-name, react/prop-types
                        tabBarIcon: ({color, }) => (
                            <Icon type='material-community' name='information-outline' color={color} size={nm(20)}/>
                        ),
                    }}
                />
            </Tab.Navigator>
            <FlashMessage position='top' />
        </NavigationContainer>
    );
}