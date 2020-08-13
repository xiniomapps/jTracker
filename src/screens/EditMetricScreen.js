import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {updateMetric} from '../redux/metricsReducer';

import MetricForm from '../components/MetricForm';

class EditMetricScreen extends Component {
    static propTypes = {
        updateMetric: PropTypes.func,
        metricsReducer: PropTypes.object,
    }

    render() {
        return (
            <ScrollView style={{flex:1, flexDirection: 'column', }} keyboardShouldPersistTaps='never'>
                <MetricForm
                    fields={this.props.metricsReducer.collection[this.props.metricsReducer.selected]}
                    onChange={(fields) => {
                        this.setState({
                            ...this.state,
                            fields: fields,
                        });
                    }}
                    onSave={(fields) => {
                        this.props.updateMetric({
                            ...fields,
                            id: this.props.metricsReducer.selected,
                        });
                        this.props.navigation.navigate('MetricsScreen');
                    }}
                />
            </ScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateMetric: obj => {
            dispatch(updateMetric(obj));
        },
    };
};

const mapStateToProps = state => {
    return {
        metricsReducer: state.metrics,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMetricScreen);