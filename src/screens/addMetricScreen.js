import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addMetric} from '../redux/metricsReducer';
import Input from '../components/Input';

class addMetricScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            objective: '',
        };
    }

    static propTypes = {
        addMetric: PropTypes.func,
    }

    handleChange = (inputName, inputValue) => {
        this.setState({
            [inputName]: inputValue,
        });
    }

    onSave = () => {
        this.props.addMetric(this.state);
        this.props.navigation.navigate('MetricsScreen');
    }

    render() {
        return (
            <View>
                <Text>Nueva Métrica </Text>
                <Input name='name' value={this.state.name} label='Nombre' placeholder='' onChange={this.handleChange} />
                <Input name='objective' value={this.state.objective} placeholder='' label='Objetivo' onChange={this.handleChange} />
                <Button title='Guardar' onPress={this.onSave}/>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMetric: obj => {
            dispatch(addMetric(obj));
        },
    };
};

//--------| Conecta el componente con el store
export default connect(null, mapDispatchToProps)(addMetricScreen);