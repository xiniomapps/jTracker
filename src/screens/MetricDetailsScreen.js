import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MetricDetailsScreen extends Component {
    constructor(props) {
        super(props);
        let currentMetric = this.props.navigation.getParam('currentMetric', undefined);

        this.state = {
            ...this.props.metricasReducer.collection[currentMetric],
            currentMetric,
        };
    }

    static propTypes = {
        metricasReducer: PropTypes.object,
        readingsReducer: PropTypes.object,
    }

    getReadings = () => {
        if (this.state.currentMetric in this.props.readingsReducer){
            return this.props.readingsReducer[this.state.currentMetric];
        }
        return {};
    }

    titleFormatter = (item) => {
        return (
            <Text>
                {item.item}
            </Text>
        );
    }

    subtitleFormatter = (item) => {
        return (
            <Text style={{color: '#999', }}>
                Reading: {this.props.readingsReducer[this.state.currentMetric][item.item].value}
            </Text>
        );
    }

    renderItem = item => {
        return (
            <ListItem
                title={this.titleFormatter(item)}
                subtitle={this.subtitleFormatter(item)}
                chevron
                bottomDivider
                onPress={() => this.gotoItemDetails(item)}
            />
        );
    }

    gotoItemDetails = (item) => {
        console.log(item);
        this.props.navigation.navigate('ReadingDetailsScreen', {
            currentMetric: this.state.currentMetric,
            currentReading: item.item,
        });
    }

    keyExtractor = (item, index) => index.toString();

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
                    onPress={ () => this.props.navigation.navigate('AddReadingScreen', {current: this.state.currentMetric, })}
                />
                <FlatList
                    data={Object.keys(this.getReadings())}
                    renderItem={ item => this.renderItem(item) }
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        metricasReducer: state.metricas,
        readingsReducer: state.readings,
    };
};

export default connect(mapStateToProps, null)(MetricDetailsScreen);