import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addMetric} from '../redux/metricsReducer';
import Input from '../components/Input';
import { nm } from '../styles/globalStyles';
import FormValidator from '../utils/FormValidator';
import {showMessage} from 'react-native-flash-message';

class AddMetricScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /* all the form fields */
            fields: {
                name: '',
                goal: '',
                units: '',
                reasons: '',
            },
            /* Contains a flag for each form field describing if it has an error (true) or not (false). Set by FormValidator */
            fieldErrorsFlags: {},
            /* If available, contains an error description for each form field. Set by FormValidator */
            fieldErrorsDesc: {},
        };
    }

    static propTypes = {
        addMetric: PropTypes.func,
    }

    /**
     * Defines constraints for field input, see: https://validatejs.org/#constraints
    */
    fieldConstraints = {
        name: {
            presence: {
                allowEmpty: false,
            },
        },
        goal: {
            presence: {
                allowEmpty: false,
            },
            numericality: {
                strict: true,
            },
        },
        units: {
            presence: {
                allowEmpty: true,
            },
        },
        reasons: {
            presence: {
                allowEmpty: true,
            },
        },
    }

    /**
     * Everytime the user types in inputName textfield, the state is updated with inputValue
     * @param {*} inputName The name of the field
     * @param {*} inputValue The new value of the field
     */
    handleChange = (inputName, inputValue) => {
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [inputName]: inputValue,
            },
        });
    }

    /**
     * If there's one or more validation error for a field, return a string with these
     * to show an errorMessage in the text field
     * @param {*} inputName name of the input
     */
    getErrorMessage = (inputName) => {
        if (inputName in this.state.fieldErrorsDesc){
            return this.state.fieldErrorsDesc[inputName].join('. ');
        }
        return '';
    }

    /**
     * Action for the save button when adding new metric
     * Adds the metric to the store and navigates back
     */
    onMetricSave = () => {
        let formValidator = new FormValidator();
        if (formValidator.validate(this.state.fields, this.fieldConstraints)){
            this.props.addMetric(this.state.fields);
            this.props.navigation.navigate('MetricsScreen');
        }
        else {
            this.setState({
                fieldErrorsFlags: formValidator.getFieldsErrorFlags(),
                fieldErrorsDesc: formValidator.getErrors(),
            }, () => {
                showMessage({
                    message: 'Missing Data',
                    description: 'Please check your input for fields: ' + Object.keys(this.state.fieldErrorsDesc).join(', '),
                    type: 'danger',
                    icon: 'auto',
                });
            });
        }
    }

    render() {
        return (
            <ScrollView style={{flex:1, flexDirection: 'column', }} keyboardShouldPersistTaps='never'>
                <View style={{flex: 1, marginVertical: nm(15), marginHorizontal: nm(20), }}>
                    <Input
                        name='name'
                        label='Name'
                        value={this.state.fields.name}
                        placeholder='e.g. Weight'
                        onChange={this.handleChange}
                        errorMessage={this.getErrorMessage('name')}
                    />
                    <Input
                        name='goal'
                        label='Goal Value'
                        value={this.state.fields.goal}
                        placeholder='e.g. 90'
                        onChange={this.handleChange}
                        keyboardType='number-pad'
                        errorMessage={this.getErrorMessage('goal')}
                    />
                    <Input
                        name='units'
                        label='Units'
                        value={this.state.fields.units}
                        placeholder='e.g. Kg (Optional)'
                        onChange={this.handleChange}
                        errorMessage={this.getErrorMessage('units')}
                    />
                    <Input
                        name='reasons'
                        label='My Reasons'
                        value={this.state.fields.reasons}
                        placeholder='Why are you tracking this (Freeform)'
                        onChange={this.handleChange}
                        multiline
                        numberOfLines={3}
                        errorMessage={this.getErrorMessage('reasons')}
                    />
                </View>
                <View>
                    <Button
                        title='Save'
                        buttonStyle={{backgroundColor: '#009933', }}
                        titleStyle={{color: '#fff', }}
                        containerStyle={{marginVertical: nm(10), marginHorizontal: nm(20), }}
                        type='outline'
                        raised
                        onPress={this.onMetricSave}
                        icon={
                            <Icon name='content-save' type='material-community' size={nm(15)} color='#fff' style={{marginRight: 10, }} />
                        }
                    />
                </View>
            </ScrollView>
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

export default connect(null, mapDispatchToProps)(AddMetricScreen);