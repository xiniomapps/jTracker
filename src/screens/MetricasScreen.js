import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class MetricasScreen extends Component {
    render() {
        return (
            <View>
                <Text> Mis Métricas </Text>
                <Icon
                    type='material'
                    name='add'
                    color='red'
                    reverse
                    onPress={ () => this.props.navigation.navigate('addMetricaScreen')}
                />
            </View>
        );
    }
}
