import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import { Colors } from '../styles';

export default class MonthlyChart extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        color: PropTypes.string,
        data: PropTypes.array.isRequired,
        metricSettings: PropTypes.object,
    }

    static defaultProps = {
        width: Dimensions.get('window').width - 30,
        height: 150,
    }

    renderChart() {
        return (
            <LineChart
                data={{
                    labels: [],
                    datasets: [ {data: this.props.data, }, ],
                }}
                withInnerLines={false}
                verticalLabelRotation={315}
                width={this.props.width}
                height={this.props.height}
                yAxisLabel={''}
                fromZero={this.props.metricSettings.fromZero}
                chartConfig={{
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 2,
                    color: () => Colors.secondaryDark,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        );
    }

    render = () => {
        if (Object.entries(this.props.data).length === 0){
            return (
                <View style={{height:this.props.height, justifyContent: 'center', paddingLeft: 15, paddingRight: 15, }}>
                    <Text style={{color: Colors.onSurfaceLight, textAlign: 'center', fontSize: 16, marginBottom: 20, fontWeight: 'bold', }}>No data found</Text>
                    <Text style={{color: Colors.onSurfaceLight, textAlign: 'center', }}>Tap on the calendar to start adding your readings.</Text>
                </View>
            );
        }
        return this.renderChart();
    }

}