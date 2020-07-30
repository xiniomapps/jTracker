
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/utils/RootNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import MetricsScreen from './src/screens/MetricsScreen';
import AddMetricScreen from './src/screens/AddMetricScreen';
import MetricDetailsScreen from './src/screens/MetricDetailsScreen';
import AboutScreen from './src/screens/AboutScreen';
import MetricSettingsScreen from './src/screens/MetricSettingsScreen';
import { nm } from './src/styles/globalStyles';

const MetricsStack = createStackNavigator();
function MetricsStackScreen() {
    return (
        <MetricsStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#069', },
                headerTintColor: '#fff',
            }}>
            <MetricsStack.Screen name='MetricsScreen' component={MetricsScreen} options={{ title: 'jTracker', }} />
            <MetricsStack.Screen name='AddMetricScreen' component={AddMetricScreen} options={{ title: 'New Metric', }}/>
            <MetricsStack.Screen name='MetricDetailsScreen' component={MetricDetailsScreen} options={{ title: 'Metric Details', }}/>
            <MetricsStack.Screen name='MetricSettingsScreen' component={MetricSettingsScreen} />
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
            <MetricsStack.Screen name='About' component={AboutScreen} />
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
        </NavigationContainer>
    );
}