import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Input from '../components/Input';
import FormValidator from '../utils/FormValidator';
import {showMessage} from 'react-native-flash-message';
import PropTypes from 'prop-types';
import { nm, Colors } from '../styles';
export default class MetricForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /* all the form fields */
            fields: {
                name: this.props.fields.name,
                goal: this.props.fields.goal,
                units: this.props.fields.units,
                reasons: this.props.fields.reasons,
            },
            /* Contains a flag for each form field describing if it has an error (true) or not (false). Set by FormValidator */
            fieldErrorsFlags: {},
            /* If available, contains an error description for each form field. Set by FormValidator */
            fieldErrorsDesc: {},
        };
    }

    static propTypes = {
        fields: PropTypes.object,
        onSave: PropTypes.func,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        fields: {
            name: '',
            goal: '',
            units: '',
            reasons: '',
        },
        onSave: () => {},
        onChange: () => {},
    };

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

    onSave = () => {
        let formValidator = new FormValidator();
        if (formValidator.validate(this.state.fields, this.fieldConstraints)){
            this.props.onSave(this.state.fields);
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
                    backgroundColor: Colors.error,
                    color: Colors.onError,
                });
            });
        }
    }

    /**
     * Everytime the user types in inputName textfield, the state is updated with inputValue
     * @param {*} inputName The name of the field
     * @param {*} inputValue The new value of the field
     */
    onChange = (inputName, inputValue) => {
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [inputName]: inputValue,
            },
        }, () => {
            this.props.onChange(this.state.fields);
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

    render() {
        return (
            <View style={{flex: 1, marginVertical: nm(15), marginHorizontal: nm(20), }}>
                <Input
                    name='name'
                    label='Name'
                    labelStyle={{ color: Colors.onSurface, }}
                    value={this.state.fields.name}
                    placeholder='e.g. Weight'
                    onChange={this.onChange}
                    errorMessage={this.getErrorMessage('name')}
                />
                <Input
                    name='goal'
                    label='Goal Value'
                    labelStyle={{ color: Colors.onSurface, }}
                    value={this.state.fields.goal}
                    placeholder='e.g. 90'
                    onChange={this.onChange}
                    keyboardType='number-pad'
                    errorMessage={this.getErrorMessage('goal')}
                />
                <Input
                    name='units'
                    label='Units'
                    labelStyle={{ color: Colors.onSurface, }}
                    value={this.state.fields.units}
                    placeholder='e.g. Kg (Optional)'
                    onChange={this.onChange}
                    errorMessage={this.getErrorMessage('units')}
                />
                <Input
                    name='reasons'
                    label='My Reasons'
                    labelStyle={{ color: Colors.onSurface, }}
                    value={this.state.fields.reasons}
                    placeholder='Why are you tracking this (Freeform)'
                    onChange={this.onChange}
                    errorMessage={this.getErrorMessage('reasons')}
                />
                <Button
                    title='Save'
                    buttonStyle={{backgroundColor: Colors.secondary, minHeight: 48, }}
                    titleStyle={{color: Colors.onSecondary, }}
                    containerStyle={{marginVertical: nm(10), marginHorizontal: nm(20), }}
                    type='outline'
                    raised
                    onPress={this.onSave}
                    icon={
                        <Icon name='content-save' type='material-community' size={nm(20)} color={Colors.onSecondary} style={{marginRight: 10, }} />
                    }
                />
            </View>
        );
    }
}
