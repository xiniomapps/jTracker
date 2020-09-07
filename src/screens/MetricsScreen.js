import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectMetric } from '../redux/metricsReducer';
import { Colors, nm } from '../styles';
import {HeaderButton} from '../components';

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
                    <HeaderButton
                        iconType='material'
                        iconName='add'
                        onPress={ () => this.props.navigation.navigate('AddMetricScreen')}
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
            <Text style={{color: Colors.onSurfaceLight, }}>
                Goal: {this.props.metricsReducer.collection[item].goal} {this.props.metricsReducer.collection[item].units}
            </Text>
        );
    }

    renderItem = ({item, }) => {
        return (
            <ListItem
                title={ this.titleFormatter(item) }
                containerStyle={{minHeight: 48, }}
                subtitle={ this.subtitleFormatter(item) }
                chevron={
                    <Icon
                        type='material-community'
                        name='chevron-right'
                        color={Colors.onSurface}
                    />
                }
                bottomDivider
                onPress={ () => this.gotoItemDetails(item)}
                leftIcon={
                    <Icon
                        type='material-community'
                        name='chart-areaspline'
                        size={nm(25)}
                        color={Colors.secondaryDark}
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
                    <Text style={{color: Colors.onSurface, textAlign: 'center', fontSize: 16, marginBottom: 20, fontWeight: 'bold', }}>No metrics found</Text>
                    <Text style={{color: Colors.onSurface, textAlign: 'center', }}>Tap on the + icon to start adding your metrics.</Text>
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