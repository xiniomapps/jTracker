import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

export default class LicenseViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    static propTypes = {
        url: PropTypes.string.isRequired,
        containerStyle: PropTypes.object,
        textStyle: PropTypes.object,
    }

    componentDidMount(){
        this.setText();
    }

    setText = async () => {
        fetch(this.props.url)
            .then(response => {
                if (response.ok){
                    return response.text();
                }
                throw new Error('Resource is not available at this moment');

            })
            .then(text => {
                this.setState({text, });
            })
            .catch( (e) => {
                this.setState({text: 'An error occured, please try again later: ' + e.message, });
            });
    }

    render() {
        return (
            <ScrollView>
                <View style={[this.props.containerStyle, {paddingBottom: 30, }, ]}>
                    <Text style={this.props.textStyle}>
                        {this.state.text}
                    </Text>
                </View>
            </ScrollView>
        );
    }
}
