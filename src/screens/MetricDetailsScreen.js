import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Icon} from 'react-native-elements';

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
            chartHeight: undefined,
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
                    <View style={{flexDirection: 'row', }}>
                        <Button
                            type='clear'
                            containerStyle={{marginRight: 5, minHeight: 48, minWidth: 48, }}
                            onPress={() => {
                                this.setState({
                                    settingsUpdated: false,
                                }, () => {
                                    this.props.navigation.navigate('EditMetricScreen');
                                });
                            }}
                            icon={
                                <Icon
                                    type='material'
                                    name='edit'
                                    size={30}
                                    color='#fff'
                                />
                            }
                        />
                        <Button
                            type='clear'
                            containerStyle={{marginRight: 5, minHeight: 48, minWidth: 48, }}
                            onPress={() => {
                                this.setState({
                                    settingsUpdated: false,
                                }, () => {
                                    this.props.navigation.navigate('MetricSettingsScreen');
                                });
                            }}
                            icon={
                                <Icon
                                    type='material'
                                    name='settings'
                                    size={30}
                                    color='#fff'
                                />
                            }
                        />
                    </View>
                );
            },
        });
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
     * change in another screen (user settings, add reading) so we can update our chart
     */
    componentDidUpdate() {
        // Check Readings Change
        let readingsUpdated = this.props.route.params?.readingsUpdated ?? false;
        if (readingsUpdated){
            this.props.route.params.readingsUpdated = undefined;
            this.setReadingsData();
        }

        // Check Settings Change
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
                <View>
                    <CalendarStrip
                        scrollable={true}
                        style={{height:100, paddingTop: 10, paddingBottom: 10, }}
                        onDateSelected={(selectedDay) => {
                            this.setState({
                                readingsUpdated: false,
                            }, () => {
                                this.props.navigation.navigate('AddReadingScreen', {
                                    selectedDay: selectedDay.valueOf(),
                                });
                            });
                        }}
                        markedDates={this.state.markedDatesForStrip}
                        customDatesStyles={[
                            {
                                startDate: moment(),
                                dateContainerStyle: { backgroundColor: '#ccc', },
                            },
                        ]}
                        maxDate={moment()}
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



const mapStateToProps = state => {
    return {
        metricsReducer: state.metrics,
        readingsReducer: state.readings,
    };
};

export default connect(mapStateToProps, null)(MetricDetailsScreen);