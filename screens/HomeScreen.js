import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebBrowser } from 'expo'
import uuid from 'uuid'

import { MonoText } from '../components/StyledText'
import MessageList from '../components/MessageList'
import SendMessage from '../components/SendMessage'

const buildMyMessage = msg => ({
    id: uuid.v1(),
    msg,
    sender: 'me',
    timestamp: Date.now(),
})

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        messages: [],
    }
    onSendMessagePress = v => {
        const messages = [...this.state.messages, buildMyMessage(v)]
        this.setState({ messages })
    }

    render() {
        const onPress = val => alert(val)
        return (
            <View style={styles.container}>
                <View style={styles.msgContainer}>
                    <MessageList messages={this.state.messages} />
                </View>
                <SendMessage onPress={this.onSendMessagePress} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    msgContainer: {
        paddingTop: 44,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
})
