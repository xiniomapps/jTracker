import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import {Card, Button} from 'react-native-elements';
import UrlButton from '../components/UrlButton';
import {globalStyles as gs} from '../styles/globalStyles';
import {Colors} from '../styles';

export default class AboutScreen extends Component {
    render() {
        return (
            <ScrollView style={{flex: 1, padding: 15, }}>
                <Card title='jTracker by XiniomApps'>
                    <View style={{flex:1, alignItems: 'center', }}>
                        <View>
                            <Image
                                source={require('../assets/jTracker_icon.png')}
                                resizeMode='contain'
                                width={144}
                                height={144}
                            />
                        </View>
                        <View>
                            <Text>Version: 1.0-8</Text>
                            <Text>Released: Aug 20, 2020</Text>
                            <Text>Developer: Jorge López Rivas</Text>
                        </View>
                    </View>
                </Card>

                <Card title='Links'>
                    <View>
                        <UrlButton
                            title='Home Page'
                            color={Colors.primaryDark}
                            url='https://gitlab.com/triebjlr/jtracker/'
                        />
                        <UrlButton
                            title='jTracker License'
                            color={Colors.primaryDark}
                            url='https://gitlab.com/triebjlr/jtracker/-/raw/development/LICENSE'
                        />
                        <UrlButton
                            title='Send suggestions and feedback'
                            color={Colors.primaryDark}
                            url='mailto:xiniomapps@gmail.com'
                        />
                        <UrlButton
                            title='Source Code on GitLab'
                            color={Colors.primaryDark}
                            url='https://gitlab.com/triebjlr/jtracker/'
                        />
                    </View>
                </Card>

                <Card title='Thanks to:' containerStyle={{marginBottom: 40, }}>
                    <View>
                        <UrlButton
                            title='Logo made by Kiranshastry'
                            color={Colors.primaryDark}
                            url='https://www.flaticon.com/free-icon/profits_711912'
                        />
                        <Button
                            title='Other Licenses'
                            titleStyle={[gs.textButtonTitle, {color: Colors.primaryDark, }, ]}
                            buttonStyle={{minHeight: 48, }}
                            type='clear'
                            url='https://gitlab.com/triebjlr/jtracker/-/raw/development/LICENSE'
                            onPress={ () => this.props.navigation.navigate('LicensesScreen')}
                        />
                    </View>
                </Card>
            </ScrollView>
        );
    }
}
