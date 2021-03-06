import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addMetric} from '../redux/metricsReducer';

import MetricForm from '../components/MetricForm';

class AddMetricScreen extends Component {
    static propTypes = {
        addMetric: PropTypes.func,
    }

    render() {
        return (
            <ScrollView style={{flex:1, flexDirection: 'column', }} keyboardShouldPersistTaps='never'>
                <MetricForm
                    onChange={(fields) => {
                        this.setState({
                            ...this.state,
                            fields: fields,
                        });
                    }}
                    onSave={(fields) => {
                        this.props.addMetric(fields);
                        this.props.navigation.navigate('MetricsScreen');
                    }}
                />
            </ScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMetric: obj => {
            dispatch(addMetric(obj));
        },
    };
};

export default connect(null, mapDispatchToProps)(AddMetricScreen);