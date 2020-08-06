import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';

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
        color: '#333',
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
                    backgroundColor: '#fff',
                    backgroundGradientFrom: this.props.color,
                    backgroundGradientFromOpacity: 0.5,
                    backgroundGradientTo: this.props.color,
                    backgroundGradientToOpacity: 1,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
                    <Text style={{color: '#999', textAlign: 'center', fontSize: 16, marginBottom: 20, fontWeight: 'bold', }}>No data found</Text>
                    <Text style={{color: '#999', textAlign: 'center', }}>Click on the calendar to start adding your readings.</Text>
                </View>
            );
        }
        return this.renderChart();
    }

}