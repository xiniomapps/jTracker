import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Linking, Alert } from 'react-native';

import { Icon, ListItem } from 'react-native-elements';
import { Colors } from '../styles';

export default class LicensesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            licenses: require('../data/licenses'),
        };
    }

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

    renderItem = ({item, }) => {
        return (
            <ListItem
                containerStyle={{minHeight: 48, }}
                title={(() => (
                    <Text style={{fontWeight: 'bold', }}>{item}</Text>
                ))()}
                subtitle={(() => (
                    <Text style={{color: Colors.onSurfaceLight, }}>
                        License: {this.state.licenses[item].licenses}
                    </Text>
                ))()}
                chevron={
                    <Icon
                        type='material-community'
                        name='chevron-right'
                        color={Colors.onSurface}
                    />
                }
                bottomDivider
                onPress={ () => this.openUrl(this.state.licenses[item].licenseUrl) }
                leftIcon={
                    <Icon
                        type='material-community'
                        name='source-branch'
                        color={Colors.secondaryDark}
                    />
                }
            />
        );
    };

    keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View>
                <FlatList
                    data={Object.keys(this.state.licenses)}
                    renderItem={ (item) => this.renderItem(item) }
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
}
