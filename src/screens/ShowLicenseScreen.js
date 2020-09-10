import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {LicenseViewer} from '../components';
import PropTypes from 'prop-types';

export default class LicenseScreen extends Component {
    static propTypes = {
        route: PropTypes.object,
    }
    render() {
        const { url, title, } = this.props.route.params;

        return (
            <View>
                <Text style={{fontWeight: 'bold', marginTop: 20, marginHorizontal: 20, }}>{title}</Text>
                <LicenseViewer
                    url={url}
                    containerStyle={{margin: 20, }}
                    textStyle={{fontSize: 14, }}
                />
            </View>
        );
    }
}
