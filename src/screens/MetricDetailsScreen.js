import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Calendar } from 'react-native-calendars';
import {Overlay, Button} from 'react-native-elements';
import Input from '../components/Input';
import { addReading } from '../redux/readingsReducer';
import MonthlyChart from '../components/MonthlyChart';

class MetricDetailsScreen extends Component {
    constructor(props) {
        super(props);
        let currentMetric = this.props.navigation.getParam('currentMetric', undefined);
        const today = new Date();

        this.state = {
            ...this.props.metricsReducer.collection[currentMetric],
            /* Metric selected in the previous screen */
            currentMetric,
            today,
            /* year and month showed on screen */
            currentYear: today.getFullYear(),
            currentMonth: today.getMonth() + 1,
            /* Date Selected by the user in calendar, obj returned by calendar */
            selectedDate: undefined,
            showOverlay: false,

            /* overlay input fields:*/
            value: '',
            comments: '',
        };
    }

    static propTypes = {
        metricsReducer: PropTypes.object,
        readingsReducer: PropTypes.object,
        addReading: PropTypes.func,
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
        let year = dayObj.year;
        let month = dayObj.month.toString().padStart('2', '0');
        let day = dayObj.day.toString().padStart('2', '0');
        let value = '';
        let comments = '';
        console.log(metric);
        console.log(year);
        console.log(month);
        console.log(this.props.readingsReducer);
        if (this.isValidReading(metric, year, month) && day in this.props.readingsReducer[metric][year][month]){
            value = this.props.readingsReducer[metric][year][month][day].value;
            comments = this.props.readingsReducer[metric][year][month][day].comments;
        }
        console.log(value);
        console.log(comments);
        this.setState({
            showOverlay: true,
            selectedDate: dayObj,
            value,
            comments,
        }, () => console.log(this.state));
    }

    onSave = () => {
        this.props.addReading({
            currentMetric: this.state.currentMetric,
            value: this.state.value,
            date: this.state.selectedDate.dateString,
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

    /* returns true if there's a registry for date */
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

    getMarkedDates = () => {
        let year = this.state.currentYear;
        let month = this.state.currentMonth;
        let metric = this.state.currentMetric;

        if (this.isValidReading(metric, year, month)){
            let result = {};
            Object.keys(this.props.readingsReducer[metric][year][month]).forEach((el) => {
                result[year + '-' + month + '-' + el] = {selected: true, selectedColor: '#069', };
            });
            return result;
        }
        return {};
    }

    /**
     * Gets the current month readings object from the redux store
     * When there's no data available it returns an empty object
     */
    getMonhlyChartData = () => {
        let year = this.state.currentYear;
        let month = this.state.currentMonth;
        let metric = this.state.currentMetric;

        if (this.isValidReading(metric, year, month)){
            return this.props.readingsReducer[metric][year][month];
        }
        return {};
    }

    onMonthChange = (month) => {
        this.setState({
            currentYear: month.year,
            currentMonth: month.month.toString().padStart('2', '0'),
        });
    }


    render() {
        return (
            <View style={{flex: 1, }}>
                <Overlay
                    isVisible={this.state.showOverlay}
                    onBackdropPress={ () => this.setState({ showOverlay: false, }) }
                >
                    <View>
                        <Input name='value' value={this.state.value} label='Day Reading' placeholder='' onChange={this.handleChange} />
                        <Input name='comments' value={this.state.comments} placeholder='' label='Comments' onChange={this.handleChange} />
                        <Button title='Save' onPress={ this.onSave } />
                    </View>
                </Overlay>
                <View style={{alignItems: 'center', backgroundColor: '#eee', paddingTop: 10, paddingBottom: 10, }}>
                    <Text style={{color: '#666', marginTop: 5, fontSize: 18, fontWeight: 'bold', }}>{this.state.name}</Text>
                    <MonthlyChart color='#069' data={this.getMonhlyChartData()}/>
                    <Text style={{color: '#999', }}>My objective: {this.state.objective}</Text>
                </View>
                <View style={{flex: 1, paddingTop: 10, borderTopColor: '#ddd', borderTopWidth: 1, }}>
                    <Calendar
                        maxDate={this.state.today}
                        onDayPress={(dayObj) => this.pickDate(dayObj)}
                        hideExtraDays={true}
                        markedDates={this.getMarkedDates()}
                        onMonthChange={ (month) => this.onMonthChange(month) }
                    />
                </View>
                <View style={{alignItems: 'center', padding: 20, }}>
                    <Text style={{color: '#999', }}>This objective was created on {Date(this.state.creationDate)}</Text>
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