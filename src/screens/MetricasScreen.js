import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MetricasScreen extends Component {

    static propTypes = {
        metricasReducer: PropTypes.object,
    }

    titleFormatter = (item) => {
        return (
            <Text>
                {this.props.metricasReducer.collection[item].name}
            </Text>
        );
    }

    subtitleFormatter = (item) => {
        return (
            <Text style={{color: '#999', }}>
                Objetivo: {this.props.metricasReducer.collection[item].objective}
            </Text>
        );
    }

    renderItem = ({item, }) => {
        return (
            <ListItem
                title={ this.titleFormatter(item) }
                subtitle={ this.subtitleFormatter(item) }
                chevron
                bottomDivider
                onPress={ () => this.gotoItemDetails(item)}
                leftIcon={
                    <Icon
                        type='material-community'
                        name='chart-line'
                        size={50}
                        color='red'
                    />
                }
            />
        );
    };

    keyExtractor = (item, index) => index.toString();

    gotoItemDetails = (index) => {
        this.props.navigation.navigate('MetricDetailsScreen', {
            currentMetric: index,
        });
    }

    render() {
        return (
            <View>
                <Text> Mis Métricas </Text>
                <Icon
                    type='material'
                    name='add'
                    color='red'
                    reverse
                    onPress={ () => this.props.navigation.navigate('addMetricaScreen')}
                />
                <FlatList
                    data={Object.keys(this.props.metricasReducer.collection)}
                    renderItem={ (item) => this.renderItem(item) }
                    keyExtractor={this.keyExtractor}
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

export default connect(mapStateToProps, null)(MetricasScreen);