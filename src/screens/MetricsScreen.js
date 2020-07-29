import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectMetric } from '../redux/metricsReducer';
import { nm } from '../styles/globalStyles';

class MetricsScreen extends Component {

    static propTypes = {
        metricsReducer: PropTypes.object,
        selectMetric: PropTypes.func,
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerRight: () => {
                return (
                    <Icon
                        type='material'
                        name='add'
                        onPress={ () => this.props.navigation.navigate('addMetricScreen')}
                        size={nm(25)}
                        color='#000'
                        containerStyle={{marginRight: nm(10), }}
                    />
                );
            },
        });
    }

    titleFormatter = (item) => {
        return (
            <Text style={{fontWeight: 'bold', }}>
                {this.props.metricsReducer.collection[item].name}
            </Text>
        );
    }

    subtitleFormatter = (item) => {
        return (
            <Text style={{color: '#999', }}>
                Goal: {this.props.metricsReducer.collection[item].objective}
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
                        name='chart-areaspline'
                        size={nm(25)}
                        color='#006699'
                    />
                }
            />
        );
    };

    keyExtractor = (item, index) => index.toString();

    gotoItemDetails = (index) => {
        this.props.selectMetric({
            id: index,
        });
        this.props.navigation.navigate('MetricDetailsScreen', {
            currentMetric: index,
        });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={Object.keys(this.props.metricsReducer.collection)}
                    renderItem={ (item) => this.renderItem(item) }
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectMetric: obj => {
            dispatch(selectMetric(obj));
        },
    };
};

const mapStateToProps = state => {
    return {
        metricsReducer: state.metrics,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricsScreen);