import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebBrowser } from 'expo'
import uuid from 'uuid'

import { MonoText } from '../components/StyledText'
import MessageList from '../components/MessageList'
import SendMessage from '../components/SendMessage'

const dialogFlowUrl = 'https://api.dialogflow.com/v1/query?v=20150910'
const dialogFlowApiKey = '25d20263da6147059d313bb029b65af7'

const buildMyMessage = (msg, sender = 'me') => ({
    id: uuid.v1(),
    msg,
    sender,
    timestamp: Date.now(),
})

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        messages: [],
    }
    onSendMessagePress = async v => {
        const messages = [...this.state.messages, buildMyMessage(v)]
        this.setState({ messages })
        const answer = await fetch(`${dialogFlowUrl}&q=${encodeURIComponent(v)}&lang=en&sessionId=1`, {
            headers: {
                Authorization: `Bearer ${dialogFlowApiKey}`,
            },
        })
            .then(data => data.json())
            .then(data =>
                this.setState({
                    messages: [...this.state.messages, buildMyMessage(data.result.fulfillment.speech, 'bot')],
                }),
            )
    }

    render() {
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
