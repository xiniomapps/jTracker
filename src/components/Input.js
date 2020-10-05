//@flow
import * as React from 'react';
import { Input as RNEInput } from 'react-native-elements';
import { Colors } from '../styles';

type Props = {
    label: string,
    labelStyle?: {},
    placeholder: string,
    placeholderTextColor?: string,
    iconName?: string,
    iconType?: string,
    name: string,
    onChange?: (fieldName: string, fieldValue: string) => void,
};

type ChangeEvent = { nativeEvent: Object};

export default class Input extends React.Component<Props> {
    static defaultProps: Object = {
        placeholderTextColor: Colors.onSurfaceLight,
        errorStyle: {color: Colors.error, },
    };

    handleChange: (event: ChangeEvent) => void = (event) => {
        if (typeof(this.props.onChange) == 'function'){
            this.props.onChange(this.props.name, event.nativeEvent.text);
        }
    }

    render(): React.Node {
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
