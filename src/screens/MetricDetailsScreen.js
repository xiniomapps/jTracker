import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Overlay, Button, Icon} from 'react-native-elements';
import Input from '../components/Input';
import { addReading } from '../redux/readingsReducer';
import MonthlyChart from '../components/MonthlyChart';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import { nm } from '../styles/globalStyles';

class MetricDetailsScreen extends Component {
    constructor(props) {
        super(props);
        /* Current selected metric is available at store */
        let currentMetric = this.props.metricsReducer.selected;

        this.state = {
            ...this.props.metricsReducer.collection[currentMetric],
            /* Metric selected in the previous screen */
            currentMetric,
            /* year and month showed on screen, default today */
            showingDate: moment(),
            /* Date Selected by the user in calendar, obj returned by calendar */
            selectedDate: undefined,
            showOverlay: false,
            chartHeight: undefined,
            /* overlay input fields: */
            value: '',
            comments: '',
            /* array containing data for generating our chart */
            readingsForChart: [],
            /* array containing selected dates for showing in calendar strip */
            markedDatesForStrip: [],
        };
    }

    static propTypes = {
        metricsReducer: PropTypes.object,
        readingsReducer: PropTypes.object,
        addReading: PropTypes.func,
        route: PropTypes.any,
        delMetric: PropTypes.func,
    }

    componentDidMount = () => {
        // Init our data for chart and calendar strip:
        this.setReadingsData();

        // Config navigation:
        this.props.navigation.setOptions({
            title: this.state.name,
            headerRight: () => {
                return (
                    <Icon
                        onPress={() => {
                            this.setState({
                                settingsUpdated: false,
                            }, () => {
                                this.props.navigation.navigate('MetricSettingsScreen');
                            });
                        }}
                        name='settings'
                        type='material'
                        size={nm(25)}
                        color='#fff'
                        containerStyle={{marginRight: nm(10), }}
                    />
                );
            },
        });
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
      * Opens overlay for adding a new reading
      * @param {*} dayObj obj with the selected date
      */
    pickDate = (dayObj) => {
        let metric = this.state.currentMetric;
        let year = dayObj.format('YYYY');
        let month = dayObj.format('MM');
        let day = dayObj.format('DD');
        let value = '';
        let comments = '';

        if (this.isValidReading(metric, year, month) && day in this.props.readingsReducer[metric][year][month]){
            value = this.props.readingsReducer[metric][year][month][day].value;
            comments = this.props.readingsReducer[metric][year][month][day].comments;
        }

        this.setState({
            showOverlay: true,
            selectedDate: dayObj,
            value,
            comments,
        });
    }

    /**
     * Action for the save button when adding new reading
     * Adds the reading to the store, hides the overlay and
     * updates chart data
     */
    onReadingSave = () => {
        this.props.addReading({
            currentMetric: this.state.currentMetric,
            value: this.state.value,
            date: this.state.selectedDate.valueOf(),
            comments: this.state.comments,
            photo: '',
        });

        this.setState({
            showOverlay: false,
            selectedDate: undefined,
            value: '',
            comments: '',
            photo: '',
        }, () => this.setReadingsData());
    }

    /**
     * Returns true if there's a registry for date
    */
    isValidReading = (metric, year, month) => {
        if ((metric in this.props.readingsReducer) &&
        (year in this.props.readingsReducer[metric]) &&
        (month in this.props.readingsReducer[metric][year])){
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Gets all data from the first reading to today
     */
    setReadingsData = () => {
        let dateRange = {
            currentMetric: this.state.currentMetric,
            readings: this.props.readingsReducer,
            start: moment(this.props.metricsReducer.collection[this.state.currentMetric].minReading),
            end: moment(),

            [Symbol.iterator](){
                this.current = this.start;
                this.dayCount = 1;
                return this;
            },
            next(){
                if (this.current.isSameOrBefore(this.end)){
                    let copy = this.current.clone();
                    this.current.add(1, 'days');
                    let currentVal =this.readings[this.currentMetric][copy.format('YYYY')][copy.format('MM')][copy.format('DD')];
                    let reading = 0;
                    if (currentVal){
                        reading = parseInt(currentVal.value);
                    }

                    return {
                        value: {
                            date: copy.format('YYYY-MM-DD'),
                            value: reading,
                        },
                    };
                }
                else {
                    return { done: true, };
                }
            },
        };
        let readingsArray = [];
        let markedDatesArray = [];

        for (let reading of dateRange){
            readingsArray.push(reading.value);
            if (reading.value != 0){
                markedDatesArray.push({
                    date: reading.date,
                    dots: [
                        {
                            color: '#069',
                            selectedColor: '#069',
                        },
                    ],
                });
            }
        }

        this.setState({
            readingsForChart: readingsArray,
            markedDatesForStrip: markedDatesArray,
        });
    }
    /**
     * Everytime we come to this screen we need to check if there was a
     * settings change so we can update our chart
     */
    componentDidUpdate() {
        let settingsUpdated = this.props.route.params?.settingsUpdated ?? false;
        if (settingsUpdated){
            this.props.route.params.settingsUpdated = undefined;
            this.setState({
                ...this.props.metricsReducer.collection[this.state.currentMetric],
            });
        }
    }

    render() {
        return (
            <View style={{flex: 1, }}>
                <Overlay
                    isVisible={this.state.showOverlay}
                    onBackdropPress={ () => this.setState({ showOverlay: false, }) }
                >
                    <View>
                        <Input name='value' value={this.state.value} label='Day Reading' placeholder='' keyboardType='number-pad' onChange={this.handleChange} />
                        <Input name='comments' value={this.state.comments} placeholder='' label='Comments' onChange={this.handleChange} />
                        <Button title='Save' onPress={ this.onReadingSave } />
                    </View>
                </Overlay>
                <View>
                    <CalendarStrip
                        scrollable={true}
                        style={{height:100, paddingTop: 10, paddingBottom: 10, }}
                        onDateSelected={(dayObj) => this.pickDate(dayObj)}
                        markedDates={this.state.markedDatesForStrip}
                        customDatesStyles={[
                            {
                                startDate: moment(),
                                dateContainerStyle: { backgroundColor: '#ccc', },
                            },
                        ]}
                    />
                </View>
                <View
                    onLayout={(event) => {
                        this.setState({chartHeight: event.nativeEvent.layout.height - nm(50), });
                    }}
                    style={{flex: 1, alignItems: 'center', backgroundColor: '#eee', paddingTop: 10, paddingBottom: 10, }}>
                    <Text style={{color: '#999', fontWeight: 'bold', fontSize: nm(14), }}>{this.state.reasons}</Text>
                    <MonthlyChart color='#069' data={this.state.readingsForChart} height={this.state.chartHeight} metricSettings={this.state.settings} />
                    <Text style={{color: '#999', }}>My goal: {this.state.goal} {this.state.units}</Text>
                </View>
                <View style={{alignItems: 'center', padding: nm(20), }}>
                    <Text style={{color: '#999', fontSize: nm(8), }}>This goal was created on {Date(this.state.creationDate)}</Text>
                </View>
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

const mapStateToProps = state => {
    return {
        metricsReducer: state.metrics,
        readingsReducer: state.readings,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricDetailsScreen);