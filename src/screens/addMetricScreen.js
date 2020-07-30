import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addMetric} from '../redux/metricsReducer';
import Input from '../components/Input';
import { nm } from '../styles/globalStyles';

class AddMetricScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            goal: '',
            units: '',
            reasons: '',
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
            <View style={{flex:1, flexDirection: 'column', }}>
                <View style={{flex: 1, marginVertical: nm(15), marginHorizontal: nm(20), }}>
                    <Input
                        name='name'
                        label='Name'
                        value={this.state.name}
                        placeholder='e.g. Weight'
                        onChange={this.handleChange}
                    />
                    <Input
                        name='goal'
                        label='Goal Value'
                        value={this.state.goal}
                        placeholder='e.g. 90'
                        onChange={this.handleChange}
                        keyboardType='number-pad'
                    />
                    <Input
                        name='units'
                        label='Units'
                        placeholder='e.g. Kg (Optional)'
                        onChange={this.handleChange}
                    />
                    <Input
                        name='reasons'
                        label='My Reasons'
                        placeholder='Why are you tracking this (Freeform)'
                        onChange={this.handleChange}
                        multiline
                        numberOfLines={3}
                    />
                </View>
                <View>
                    <Button
                        buttonStyle={{backgroundColor: '#009933', }}
                        titleStyle={{color: '#fff', }}
                        containerStyle={{marginVertical: nm(10), marginHorizontal: nm(20), }}
                        type='outline'
                        title='Guardar' onPress={this.onSave}
                        raised
                    />
                </View>
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
export default connect(null, mapDispatchToProps)(AddMetricScreen);