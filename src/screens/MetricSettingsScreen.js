import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon, CheckBox } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import { nm } from '../styles/globalStyles';
import { delMetric, saveMetricSettings } from '../redux/metricsReducer';
import { HeaderBackButton } from '@react-navigation/stack';

class MetricSettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMetric: this.props.metricsReducer.selected,
            ...this.props.metricsReducer.collection[this.props.metricsReducer.selected],
            showAlert: false,
            settings: this.props.metricsReducer.collection[this.props.metricsReducer.selected].settings,
            //settingsUpdated: false,
        };
    }

    static propTypes = {
        metricsReducer: PropTypes.object,
        delMetric: PropTypes.func,
        saveMetricSettings: PropTypes.func,
        route: PropTypes.any,
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

    toggleFromZero = () => {
        this.setState({
            settings: {
                fromZero: !this.state.settings.fromZero,
            },
        }, this.saveSettings);
    }

    /** Callback definition for modifying the params we sent back in case
     * settings have been modified
    */
    modifyHeaderLeftAction = (settingsUpdated) => {
        this.props.navigation.setOptions({
            title: this.state.name + ' Settings',
            headerLeft: (props) => {
                return (
                    <HeaderBackButton
                        {...props}
                        onPress={ () => {
                            // Goback, notifying any settings change
                            this.props.navigation.navigate('MetricDetailsScreen', {
                                settingsUpdated,
                            });
                        }}
                    />
                );
            },
        });
    }

    componentDidMount(){
        this.modifyHeaderLeftAction(false);
    }

    saveSettings = () => {
        this.props.saveMetricSettings({
            id: this.state.currentMetric,
            settings: this.state.settings,
        });
        this.modifyHeaderLeftAction(true);
    }

    render() {
        return (
            <View>
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
                <CheckBox title='Chart starts from zero' checked={this.state.settings.fromZero}
                    onPress={this.toggleFromZero}
                />
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
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delMetric: obj => {
            dispatch(delMetric(obj));
        },
        saveMetricSettings: obj => {
            dispatch(saveMetricSettings(obj));
        },
    };
};
const mapStateToProps = state => {
    return {
        metricsReducer: state.metrics,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricSettingsScreen);