import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {saveUserSettings} from '../redux/userSettingsReducer';
import Input from '../components/Input';
import { nm } from '../styles/globalStyles';

class UserSettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.userSettingsReducer.name,
        };
    }

    static propTypes = {
        saveUserSettings: PropTypes.func,
        userSettingsReducer: PropTypes.object,
    }

    handleChange = (inputName, inputValue) => {
        this.setState({
            [inputName]: inputValue,
        }, () => {
            this.props.saveUserSettings(this.state);
        });
    }

    render() {
        return (
            <ScrollView style={{flex:1, flexDirection: 'column', }} keyboardShouldPersistTaps='never'>
                <View style={{flex: 1, marginVertical: nm(15), marginHorizontal: nm(20), }}>
                    <Input
                        name='name'
                        label='Your Name'
                        value={this.state.name}
                        placeholder=''
                        onChange={this.handleChange}
                    />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        userSettingsReducer: state.userSettings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveUserSettings: obj => {
            dispatch(saveUserSettings(obj));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsScreen);