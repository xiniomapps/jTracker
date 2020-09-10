import React, { Component } from 'react';
import {LicenseViewer} from '../components';
import PropTypes from 'prop-types';

export default class LicenseScreen extends Component {
    static propTypes = {
        route: PropTypes.object,
    }
    render() {
        const { url, } = this.props.route.params;

        return (
            <LicenseViewer
                url={url}
                containerStyle={{margin: 20, }}
                textStyle={{fontSize: 10, }}
            />
        );
    }
}
