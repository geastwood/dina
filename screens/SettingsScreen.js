import React from 'react'
import { Image, View, Input } from 'react-native'
import { ExpoConfigView } from '@expo/samples'
import { phoneNumber } from '../config'

import { Text } from 'react-native-elements'

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
        return (
            <View style={{ padding: 16, backgroundColor: 'white' }}>
                <Text>Phone Numbers: {phoneNumber}</Text>
            </View>
        )
    }
}
