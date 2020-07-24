import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';

export default class MonthlyChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        color: PropTypes.string,
        data: PropTypes.object.isRequired,
    }

    static defaultProps = {
        width: Dimensions.get('window').width - 30,
        height: 200,
        color: '#333',
    }

    /**
     * Transforms the data coming from the parent which is in
     * our store format and generate a new object as required for the
     * LineChart component
     */
    transformPropsData = () => {
        let result = [];
        // get sortedKeys array and create the new array with data
        Object.keys(this.props.data).sort().forEach(el => {
            result.push(parseFloat(this.props.data[el].value));
        });
        return { data: result, };
    }

    renderChart() {
        return (
            <LineChart
                data={{
                    labels: [
                        //'01', '', '', '',
                        //'05', '', '', '', '',
                        //'10', '', '', '', '',
                        //'15', '', '', '', '',
                        //'20', '', '', '', '',
                        //'25', '', '', '', '',
                        //'30',
                    ],
                    datasets: [ this.transformPropsData(), ],
                }}
                withInnerLines={false}
                verticalLabelRotation={315}
                width={this.props.width}
                height={this.props.height}
                yAxisLabel={''}
                fromZero={true}
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