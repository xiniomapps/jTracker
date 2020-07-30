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
//import AwesomeAlert from 'react-native-awesome-alerts';
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
        };
    }

    static propTypes = {
        metricsReducer: PropTypes.object,
        readingsReducer: PropTypes.object,
        addReading: PropTypes.func,
        route: PropTypes.any,
        delMetric: PropTypes.func,
    }

    /**
     * Configure the Navigation Bar for this screen
     */
    componentDidMount = () => {
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

    handleChange = (inputName, inputValue) => {
        this.setState({
            [inputName]: inputValue,
        });
    }

    getReadings = () => {
        if (this.state.currentMetric in this.props.readingsReducer){
            return this.props.readingsReducer[this.state.currentMetric];
        }
        return {};
    }

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

    onSave = () => {
        this.props.addReading({
            currentMetric: this.state.currentMetric,
            value: this.state.value,
            date: this.state.selectedDate.format(),
            comments: this.state.comments,
            photo: '',
        });

        this.setState({
            showOverlay: false,
            selectedDate: undefined,
            value: '',
            comments: '',
            photo: '',
        });
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
     * Get array of dates with data so we can display it correctly
     * on calendar strip
    */
    getMarkedDates = () => {
        let year = this.state.showingDate.format('YYYY');
        let month = this.state.showingDate.format('MM');
        let metric = this.state.currentMetric;

        if (this.isValidReading(metric, year, month)){
            let result = [];
            Object.keys(this.props.readingsReducer[metric][year][month]).forEach((el) => {
                let obj = {
                    date: year + '-' + month + '-' + el,
                    dots: [
                        {
                            color: '#069',
                            selectedColor: '#069',
                        },
                    ],
                };
                result.push(obj);

            });
            return result;
        }
        return [];
    }

    /**
     * Gets the current month readings object from the redux store
     * When there's no data available it returns an empty object
     */
    getMonhlyChartData = () => {
        let year = this.state.showingDate.format('YYYY');
        let month = this.state.showingDate.format('MM');
        let metric = this.state.currentMetric;

        if (this.isValidReading(metric, year, month)){
            return this.props.readingsReducer[metric][year][month];
        }
        return {};
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
                        <Button title='Save' onPress={ this.onSave } />
                    </View>
                </Overlay>
                <View>
                    <CalendarStrip
                        scrollable={true}
                        style={{height:100, paddingTop: 10, paddingBottom: 10, }}
                        onDateSelected={(dayObj) => this.pickDate(dayObj)}
                        markedDates={this.getMarkedDates()}
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
                    <MonthlyChart color='#069' data={this.getMonhlyChartData()} height={this.state.chartHeight} metricSettings={this.state.settings} />
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