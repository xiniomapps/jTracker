import React, { Component } from 'react';
import { Linking, Alert } from 'react-native';
import { Button as RNEButton, Icon } from 'react-native-elements';
import {globalStyles as gs} from '../styles/globalStyles';
import PropTypes from 'prop-types';


export default class UrlButton extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        iconName: PropTypes.string,
        iconType: PropTypes.string,
        color: PropTypes.string,
        url: PropTypes.string,
        hidden: PropTypes.bool,
    }

    static defaultProps ={
        title: 'Url Button',
        iconName: '',
        iconType: '',
        color: 'blue',
        hidden: false,
    };

    openUrl = (url) => {
        //Checks device can open url
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    this.browserAlert('Warning', 'Cannot open URL.');
                }
                else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred while trying to open the URL', err));
    }

    browserAlert = (title, msj) => {
        Alert.alert(
            title,
            msj,
            [
                {text: 'OK', onPress: () => { }, style: 'Cancel', },
            ],
            { cancelable: true, }
        );
    }

    renderIcon = () => {
        if (this.props.iconName != ''){
            return (
                <Icon
                    iconStyle={{ color: this.props.color, }}
                    type={this.props.iconType || ''}
                    name={this.props.iconName || ''} />
            );
        }
        return null;
    }
    render() {
        if (!this.props.hidden) {
            return (
                <RNEButton
                    {...this.props}
                    type='clear'
                    buttonStyle={[gs.textButton, {minHeight: 48, }, ]}
                    titleStyle={[gs.textButtonTitle, {color: this.props.color, }, ]}
                    title={this.props.title}
                    icon={ this.renderIcon() }
                    onPress={ () => {
                        this.openUrl(this.props.url);
                    }} />
            );
        }
        else {
            return null;
        }
    }
}
