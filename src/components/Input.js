import React, { Component } from 'react';
import { Input as RNEInput } from 'react-native-elements';
//import {globalStyles as gs, globalColors as gc} from '../styles/globalStyles';
import PropTypes from 'prop-types';

export default class Input extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        iconName: PropTypes.string,
        iconType: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
    }

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
                label={this.props.label}
                //containerStyle={gs.inputOutContainer}
                //inputContainerStyle={gs.inputInContainer}
                //labelStyle={gs.inputLabel}
                inputStyle={{minHeight:48, }}
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
