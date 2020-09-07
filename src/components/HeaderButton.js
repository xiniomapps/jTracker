import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import {Colors, headerStyles} from '../styles';

export default class HeaderButton extends Component {
    static propTypes = {
        iconType: PropTypes.string,
        iconName: PropTypes.string,
        iconSize: PropTypes.number,
        iconColor: PropTypes.string,
        onPress: PropTypes.func,
    }

    static defaultProps ={
        iconSize: 30,
        iconColor: Colors.onPrimary,
        onPress: () => {},
    };

    render() {
        return (
            <TouchableHighlight
                style={headerStyles.iconButton}
                onPress={this.props.onPress}
            >
                <Icon
                    type={this.props.iconType}
                    name={this.props.iconName}
                    size={this.props.iconSize}
                    color={this.props.iconColor}
                />
            </TouchableHighlight>
        );
    }
}
