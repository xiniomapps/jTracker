import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addMetrica} from '../redux/metricasReducer';
import Input from '../components/Input';

class addMetricaScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            objective: '',
        };
    }

    static propTypes = {
        addMetrica: PropTypes.func,
    }

    handleChange = (inputName, inputValue) => {
        console.log(inputName + ' -> ' + inputValue);
        this.setState({
            [inputName]: inputValue,
        });
    }

    onSave = () => {
        this.props.addMetrica(this.state);
        this.props.navigation.navigate('MetricasScreen');
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

//const mapStateToProps = state => {
//    return {
//      busquedaReducer: state.busqueda,
//      loading: state.loading,
//    };
//};

const mapDispatchToProps = dispatch => {
    return {
        addMetrica: obj => {
            dispatch(addMetrica(obj));
        },
    };
};

//--------| Conecta el componente con el store
export default connect(null, mapDispatchToProps)(addMetricaScreen);