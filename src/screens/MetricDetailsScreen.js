import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MetricDetailsScreen extends Component {
    constructor(props) {
        super(props);
        let current = this.props.navigation.getParam('current', undefined);

        this.state = {
            ...this.props.metricasReducer.collection[current],
            current,
        };
    }

    static propTypes = {
        metricasReducer: PropTypes.object,
    }

    render() {
        return (
            <View>
                <Text>Nombre: {this.state.name}</Text>
                <Text>Fecha: {this.state.creationDate}</Text>
                <Text>Objetivo: {this.state.objective}</Text>

                <Icon
                    type='material'
                    name='add'
                    color='red'
                    reverse
                    onPress={ () => this.props.navigation.navigate('AddReadingScreen', {current: this.state.current, })}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        metricasReducer: state.metricas,
    };
};

export default connect(mapStateToProps, null)(MetricDetailsScreen);