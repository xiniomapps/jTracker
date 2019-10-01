import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ReadingDetailsScreen extends Component {
    constructor(props) {
        super(props);
        let currentMetric = this.props.navigation.getParam('currentMetric', undefined);
        let currentReading = this.props.navigation.getParam('currentReading', undefined);

        this.state = {
            //...this.props.metricasReducer.collection[currentMetric],
            currentMetric,
            currentReading,
        };
    }

    static propTypes = {
        readingsReducer: PropTypes.object,
    }

    render() {
        return (
            <View>
                <Text> Reading details </Text>
                <Text>{ this.state.currentReading }</Text>
                <Text>{this.props.readingsReducer[this.state.currentMetric][this.state.currentReading].value}</Text>
                <Text>{this.props.readingsReducer[this.state.currentMetric][this.state.currentReading].comments}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        readingsReducer: state.readings,
    };
};

export default connect(mapStateToProps, null)(ReadingDetailsScreen);