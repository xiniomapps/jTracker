import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
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
        readingsReducer: PropTypes.object,
    }

    getReadings = () => {
        if (this.state.current in this.props.readingsReducer){
            return this.props.readingsReducer[this.state.current];
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
        //console.log(item);
        console.log(this.props.readingsReducer[this.state.current][item.item].value);
        return (
            <Text style={{color: '#999', }}>
                Reading: {this.props.readingsReducer[this.state.current][item.item].value}
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
            />
        );
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
                    onPress={ () => this.props.navigation.navigate('AddReadingScreen', {current: this.state.current, })}
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