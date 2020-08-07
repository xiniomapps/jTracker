import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Input from '../components/Input';
import { nm } from '../styles/globalStyles';
import { addReading } from '../redux/readingsReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

class AddReadingScreen extends Component {
    constructor(props) {
        super(props);
        let currentMetric = this.props.metricsReducer.selected;
        let selectedDay = moment(this.props.route.params?.selectedDay ?? undefined);
        let readingsExists = this.readingExists(selectedDay);

        this.state = {
            currentMetric,
            selectedDay,
            value: readingsExists ? this.props.readingsReducer[currentMetric][selectedDay.format('YYYY')][selectedDay.format('MM')][selectedDay.format('DD')].value : undefined,
            comments: readingsExists ? this.props.readingsReducer[currentMetric][selectedDay.format('YYYY')][selectedDay.format('MM')][selectedDay.format('DD')].comments : '',
        };

    }

    static propTypes = {
        metricsReducer: PropTypes.object,
        readingsReducer: PropTypes.object,
        addReading: PropTypes.func,
        route: PropTypes.any,
    }

    componentDidMount = () => {
        // Configure navigation Bar:
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
     * Handles the change  value for any field of overlay
     * @param {*} inputName Name of the field
     * @param {*} inputValue value of the field
     */
    handleChange = (inputName, inputValue) => {
        this.setState({
            [inputName]: inputValue,
        });
    }

    /**
     * Action for the save button when adding new reading
     * Adds the reading to the store and navigates back
     */
    onReadingSave = () => {
        this.props.addReading({
            currentMetric: this.state.currentMetric,
            date: this.state.selectedDay.valueOf(),
            value: this.state.value,
            comments: this.state.comments,
            photo: '',
        });

        this.props.navigation.navigate('MetricDetailsScreen', {
            readingsUpdated: true,
        });
    }

    render() {
        return (
            <ScrollView style={{flex:1, flexDirection: 'column', }} keyboardShouldPersistTaps='never'>
                <View style={{flex: 1, marginVertical: nm(15), marginHorizontal: nm(20), }}>
                    <Input
                        name='value'
                        label='Reading'
                        value={this.state.value}
                        placeholder=''
                        onChange={this.handleChange}
                        keyboardType='number-pad'
                    />
                    <Input
                        name='comments'
                        label='Notes'
                        value={this.state.comments}
                        placeholder=''
                        onChange={this.handleChange}
                        multiline
                        numberOfLines={3}
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