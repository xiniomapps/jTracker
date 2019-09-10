import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class addMetricaScreen extends Component {
    onSave = () => {
        this.props.navigation.navigate('MetricasScreen');
    }

    render() {
        return (
            <View>
                <Text>Nueva Métrica </Text>
                <Input label='Nombre'/>
                <Input label='Objetivo' />
                <Button title='Guardar' onPress={this.onSave}/>
            </View>
        );
    }
}
