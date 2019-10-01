import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Input from '../components/Input';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReading } from '../redux/readingsReducer';

class AddReadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.navigation.getParam('current', undefined),
            value: null,
            date: null,
            comments: '',
            photo: '',
        };
    }

    static propTypes = {
        addReading: PropTypes.func,
    }

    handleChange = (inputName, inputValue) => {
        this.setState({
            [inputName]: inputValue,
        });
    }

    onSave = () => {
        this.props.addReading(this.state);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View>
                <Text>Nueva lectura: </Text>
                <Input name='value' value={this.state.value} label='Valor' placeholder='' onChange={this.handleChange} />
                <Input name='date' value={this.state.date} placeholder='' label='Fecha' onChange={this.handleChange} />
                <Input name='comments' value={this.state.comments} placeholder='' label='Comentarios' onChange={this.handleChange} />
                <Button title='Guardar' onPress={this.onSave}/>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addReading: obj => {
            dispatch(addReading(obj));
        },
    };
};

//--------| Conecta el componente con el store
export default connect(null, mapDispatchToProps)(AddReadingScreen);