import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebBrowser } from 'expo'
import uuid from 'uuid'

import { MonoText } from '../components/StyledText'
import MessageList from '../components/MessageList'
import SendMessage from '../components/SendMessage'
import { dialogFlowUrl, dialogFlowApiKey, tyntecApiKey, tyntecSmsUrl, phoneNumber } from '../config'

const blacklist = ['ill', 'kill', 'depressed']
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
    sendMessage = (v, from = 'me') => {
        const messages = [...this.state.messages, buildMyMessage(v, from)]
        this.setState({ messages })
    }
    handleAlertMessage = async v => {
        const shouldHandle = blacklist.some(word => v.toLowerCase().includes(word))
        if (shouldHandle) {
            const resp = await fetch(tyntecSmsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: tyntecApiKey,
                },
                body: JSON.stringify({
                    from: 'DiNa',
                    to: phoneNumber,
                    message: 'Kid needs care!',
                }),
            }).then(data => data.json())
            console.log(resp)
        }
        // curl -i -X POST https://api.tyntec.com/messaging/sms/v1/ -H "Content-Type: application/json" -H "apikey: e5e84d98e4a64a509e2e5844004bd65b" -d '{"from":"tyntec", "to":"+4915124143143","message":"hello world"}'
    }
    onSendMessagePress = async v => {
        this.sendMessage(v, 'me')
        const answer = await fetch(`${dialogFlowUrl}&q=${encodeURIComponent(v)}&lang=en&sessionId=1`, {
            headers: {
                Authorization: `Bearer ${dialogFlowApiKey}`,
            },
        }).then(data => data.json())
        this.sendMessage(answer.result.fulfillment.speech, 'bot')
        this.handleAlertMessage(v)
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
