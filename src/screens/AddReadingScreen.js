import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Input from '../components/Input';
import { nm } from '../styles/globalStyles';
import { addReading } from '../redux/readingsReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import FormValidator from '../utils/FormValidator';
import {showMessage} from 'react-native-flash-message';

class AddReadingScreen extends Component {
    constructor(props) {
        super(props);
        let currentMetric = this.props.metricsReducer.selected;
        let selectedDay = moment(this.props.route.params?.selectedDay ?? undefined);
        let readingsExists = this.readingExists(selectedDay);

        this.state = {
            /* all the form fields */
            fields: {
                value: readingsExists ? this.props.readingsReducer[currentMetric][selectedDay.format('YYYY')][selectedDay.format('MM')][selectedDay.format('DD')].value : undefined,
                comments: readingsExists ? this.props.readingsReducer[currentMetric][selectedDay.format('YYYY')][selectedDay.format('MM')][selectedDay.format('DD')].comments : '',
            },
            currentMetric,
            selectedDay,
            /* Contains a flag for each form field describing if it has an error (true) or not (false). Set by FormValidator */
            fieldErrorsFlags: {},
            /* If available, contains an error description for each form field. Set by FormValidator */fieldErrorsDesc: {},

        };

    }

    static propTypes = {
        metricsReducer: PropTypes.object,
        readingsReducer: PropTypes.object,
        addReading: PropTypes.func,
        route: PropTypes.any,
    }

    /**
     * Defines constraints for field input, see: https://validatejs.org/#constraints
    */
    fieldConstraints = {
        value: {
            presence: {
                allowEmpty: false,
            },
            numericality: {
                strict: true,
            },
        },
        comments: {
            presence: {
                allowEmpty: true,
            },
        },
    }

    componentDidMount = () => {
        /* Configure navigation Bar: */
        this.props.navigation.setOptions({
            title: this.state.selectedDay.format('MMM Do YYYY'),
        });
    }

    /**
     * Returns true if there's a registry for selected date
     * @param {*} mmnt Moment obj of selected date
     */
    readingExists = (mmnt) => {
        let year = mmnt.format('YYYY');
        let month = mmnt.format('MM');
        let day = mmnt.format('DD');

        if ((this.props.metricsReducer.selected in this.props.readingsReducer) &&
            (year in this.props.readingsReducer[this.props.metricsReducer.selected]) &&
            (month in this.props.readingsReducer[this.props.metricsReducer.selected][year]) &&
            (day in this.props.readingsReducer[this.props.metricsReducer.selected][year][month])){
            return true;
        }
        else {
            return false;
        }
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
     * Action for the save button when adding new reading
     * Adds the reading to the store and navigates back
     */
    onReadingSave = () => {
        let formValidator = new FormValidator();
        if (formValidator.validate(this.state.fields, this.fieldConstraints)){
            this.props.addReading({
                currentMetric: this.state.currentMetric,
                date: this.state.selectedDay.valueOf(),
                value: this.state.fields.value,
                comments: this.state.fields.comments,
                photo: '',
            });

            this.props.navigation.navigate('MetricDetailsScreen', {
                readingsUpdated: true,
            });
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
                        name='value'
                        label='Reading'
                        value={this.state.fields.value}
                        placeholder=''
                        onChange={this.handleChange}
                        keyboardType='number-pad'
                        errorMessage={this.getErrorMessage('value')}
                    />
                    <Input
                        name='comments'
                        label='Notes'
                        value={this.state.fields.comments}
                        placeholder=''
                        onChange={this.handleChange}
                        multiline
                        numberOfLines={3}
                        errorMessage={this.getErrorMessage('comments')}
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
                        onPress={this.onReadingSave}
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
        addReading: obj => {
            dispatch(addReading(obj));
        },
    };
};


const mapStateToProps = state => {
    return {
        metricsReducer: state.metrics,
        readingsReducer: state.readings,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReadingScreen);