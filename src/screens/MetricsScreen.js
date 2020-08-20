import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectMetric } from '../redux/metricsReducer';
import { nm } from '../styles/globalStyles';

class MetricsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewHeight: undefined,
        };
    }


    static propTypes = {
        metricsReducer: PropTypes.object,
        selectMetric: PropTypes.func,
    }

    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerRight: () => {
                return (
                    <Button
                        type='clear'
                        onPress={ () => this.props.navigation.navigate('AddMetricScreen')}
                        containerStyle={{marginRight: 5, minHeight: 48, minWidth: 48, }}
                        icon={
                            <Icon
                                type='material'
                                name='add'
                                size={30}
                                color='#fff'
                            />
                        }
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
                Goal: {this.props.metricsReducer.collection[item].goal} {this.props.metricsReducer.collection[item].units}
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
        if (Object.entries(this.props.metricsReducer.collection).length === 0){
            return (
                <View
                    style={{justifyContent: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: nm(50), }}>
                    <Text style={{color: '#999', textAlign: 'center', fontSize: 16, marginBottom: 20, fontWeight: 'bold', }}>No metrics found</Text>
                    <Text style={{color: '#999', textAlign: 'center', }}>Tap on the + icon to start adding your metrics.</Text>
                </View>
            );
        }
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