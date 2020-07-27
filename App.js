
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/utils/RootNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import MetricsScreen from './src/screens/MetricsScreen';
import addMetricScreen from './src/screens/addMetricScreen';
import MetricDetailsScreen from './src/screens/MetricDetailsScreen';
import AboutScreen from './src/screens/AboutScreen';
import MetricSettingsScreen from './src/screens/MetricSettingsScreen';

const MetricsStack = createStackNavigator();
function MetricsStackScreen() {
    return (
        <MetricsStack.Navigator>
            <MetricsStack.Screen name='MetricsScreen' component={MetricsScreen} options={{ title: 'My Metrics', }} />
            <MetricsStack.Screen name='addMetricScreen' component={addMetricScreen} options={{ title: 'Add New Metric', }}/>
            <MetricsStack.Screen name='MetricDetailsScreen' component={MetricDetailsScreen} options={{ title: 'Metric Details', }}/>
            <MetricsStack.Screen name='MetricSettingsScreen' component={MetricSettingsScreen} options={{ title: 'Settings', }} />
        </MetricsStack.Navigator>
    );
}

const AboutStack = createStackNavigator();
function AboutStackScreen(){
    return (
        <AboutStack.Navigator>
            <MetricsStack.Screen name='About' component={AboutScreen} />
        </AboutStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Tab.Navigator>
                <Tab.Screen
                    name='My Metrics'
                    component={MetricsStackScreen}
                    options={{
                        // eslint-disable-next-line react/display-name
                        tabBarIcon: () => (
                            <Icon type='material-community' name='chart-line'/>
                        ),
                    }}
                />
                <Tab.Screen
                    name='About'
                    component={AboutStackScreen}
                    options={{
                        // eslint-disable-next-line react/display-name
                        tabBarIcon: () => (
                            <Icon type='material-community' name='information-outline'/>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}