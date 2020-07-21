import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class AboutScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, padding: 30, }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', }}>JTracker version 1.0 </Text>
                <Text>This app is provided to you for free by Xiniom.com</Text>
                <Text>Developer: Jorge López Rivas</Text>
                <Text>Home Page: https://xiniom.com/jTracker</Text>
                <Text>Requests: incoming+triebjlr-jtracker-14223896-issue-@incoming.gitlab.com</Text>
            </View>
        );
    }
}
