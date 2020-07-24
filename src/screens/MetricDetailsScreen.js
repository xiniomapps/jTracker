import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Overlay, Button, Icon} from 'react-native-elements';
import Input from '../components/Input';
import { addReading } from '../redux/readingsReducer';
import { delMetric } from '../redux/metricsReducer';
import MonthlyChart from '../components/MonthlyChart';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import AwesomeAlert from 'react-native-awesome-alerts';
import { nm } from '../styles/globalStyles';

class MetricDetailsScreen extends Component {
    constructor(props) {
        super(props);
        let currentMetric = this.props.route.params?.currentMetric ?? undefined;

        this.state = {
            ...this.props.metricsReducer.collection[currentMetric],
            /* Metric selected in the previous screen */
            currentMetric,
            /* year and month showed on screen, default today */
            showingDate: moment(),
            /* Date Selected by the user in calendar, obj returned by calendar */
            selectedDate: undefined,
            showOverlay: false,
            showAlert: false,

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

    deleteMetric = () => {
        this.setState({
            showAlert: false,
        }, () => {
            this.props.delMetric({
                id: this.state.currentMetric,
            });
        });
    }

    render() {
        return (
            <View style={{flex: 1, }}>
                <AwesomeAlert
                    show={this.state.showAlert}
                    title='Delete Metric'
                    message='Are you sure you want to delete this metric? This action cannot be undone'
                    showCancelButton={true}
                    cancelText='Cancel'
                    onCancelPressed={ () => {
                        this.setState({showAlert: false, });
                    }}
                    showConfirmButton={true}
                    confirmButtonColor='#a62700'
                    confirmText='Yes, delete it'
                    onConfirmPressed={this.deleteMetric}
                />
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
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#eee', paddingTop: 10, paddingBottom: 10, }}>
                    <MonthlyChart color='#069' data={this.getMonhlyChartData()}/>
                    <Text style={{color: '#999', }}>My objective: {this.state.objective}</Text>
                </View>
                <View style={{alignItems: 'center', padding: nm(20), }}>
                    <Button
                        title='Delete this metric'
                        containerStyle={{marginBottom: nm(10), }}
                        buttonStyle={{backgroundColor: '#a62700', }}
                        titleStyle={{fontSize: nm(11), }}
                        onPress={ () => {
                            this.setState({ showAlert: true, });
                        }}
                        icon={
                            <Icon name='delete-outline' type='material-community' size={nm(15)} color='#fff' />
                        }
                    />
                    <Text style={{color: '#999', fontSize: nm(8), }}>This objective was created on {Date(this.state.creationDate)}</Text>

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
        delMetric: obj => {
            dispatch(delMetric(obj));
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