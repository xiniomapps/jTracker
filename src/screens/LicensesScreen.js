import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Colors } from '../styles';

export default class LicensesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            licenses: require('../data/licenses'),
        };
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
                onPress={ () => this.props.navigation.navigate('ShowLicenseScreen', {
                    url: this.state.licenses[item].licenseUrl,
                    title: item,
                })}
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
