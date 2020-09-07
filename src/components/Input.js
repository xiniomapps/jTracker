import React, { Component } from 'react';
import { Input as RNEInput } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Colors } from '../styles';

export default class Input extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        labelStyle: PropTypes.object,
        placeholder: PropTypes.string.isRequired,
        placeholderTextColor: PropTypes.string,
        iconName: PropTypes.string,
        iconType: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
    }

    static defaultProps ={
        placeholderTextColor: Colors.onSurfaceLight,
        errorStyle: {color: Colors.error, },
    };

    handleChange = (e) => {
        if (typeof(this.props.onChange) == 'function'){
            this.props.onChange(this.props.name, e.nativeEvent.text);
        }
    }

    render() {
        return (
            <RNEInput
                {...this.props}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                label={this.props.label}
                //containerStyle={gs.inputOutContainer}
                //inputContainerStyle={gs.inputInContainer}
                labelStyle={this.props.labelStyle}
                inputStyle={{minHeight:48, }}
                inputContainerStyle={{borderBottomColor: Colors.onSurfaceLight, borderBottomWidth: 2, }}
                onChange={this.handleChange}
                //leftIcon={
                //    <Icon
                //        type={this.props.iconType}
                //        iconStyle={{ color: gc.aztecaGreen, }}
                //        name={this.props.iconName} />
                //}
            />
        );
    }
}
