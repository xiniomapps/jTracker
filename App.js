
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import MetricsScreen from './src/screens/MetricsScreen';
import addMetricScreen from './src/screens/addMetricScreen';
import MetricDetailsScreen from './src/screens/MetricDetailsScreen';


const MetricsStack = createStackNavigator();
function MetricsStackScreen() {
    return (
        <MetricsStack.Navigator>
            <MetricsStack.Screen name='MetricsScreen' component={MetricsScreen} options={{ title: 'My Metrics', }} />
            <MetricsStack.Screen name='addMetricScreen' component={addMetricScreen} options={{ title: 'Add New Metric', }}/>
            <MetricsStack.Screen name='MetricDetailsScreen' component={MetricDetailsScreen} options={{ title: 'Metric Details', }}/>
        </MetricsStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='My Metrics' component={MetricsStackScreen}
                    options={{
                        // eslint-disable-next-line react/display-name
                        tabBarIcon: () => (
                            <Icon type='material-community' name='chart-line'/>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}