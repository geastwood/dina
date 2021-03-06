import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebBrowser } from 'expo'
import uuid from 'uuid'
import { get } from 'lodash'
import moment from 'moment'
import { Button } from 'react-native-elements'

import { MonoText } from '../components/StyledText'
import MessageList from '../components/MessageList'
import SendMessage from '../components/SendMessage'
import {
    dialogFlowUrl,
    dialogFlowApiKey,
    tyntecApiKey,
    tyntecSmsUrl,
    phoneNumber,
    googleApiUrl,
    googleApiKey,
    appCodeName,
} from '../config'

const blacklist = ['ill', 'depressed', 'stomach ache']
const locationPhrase = 'How can I get there?'
const startLocation = 'Munich train station'
const endLocation = 'Hofmannstraße 25 Munich'
const levelUp = 'Level up'
const funnyImageUrl = 'http://cuncun.club/wp-content/uploads/2016/02/2460.jpg'

const buildMyMessage = (msg, sender = 'me', type = 'text', data = {}) => ({
    id: uuid.v1(),
    msg,
    type,
    data,
    sender,
    timestamp: Date.now(),
})

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    state = {
        messages: [],
        showLevelUp: false,
    }
    sendMessage = (v, from = 'me', type = 'text', data = {}) => {
        const messages = [buildMyMessage(v, from, type, data), ...this.state.messages]
        this.setState({ messages })
    }
    handleLocation = async v => {
        const shouldHandle = locationPhrase.toLowerCase().includes(v.toLowerCase())
        if (shouldHandle) {
            const resp = await fetch(
                `${googleApiUrl}origin=${encodeURIComponent(startLocation)}&destination=${encodeURIComponent(
                    endLocation,
                )}&mode=transit&key=${googleApiKey}`,
            ).then(data => data.json())
            const legs = get(resp, 'routes[0].legs')
            const arrivalTime = moment(Number(get(legs, '[0].arrival_time.value')) * 1000).fromNow()
            const distance = get(legs, '[0].distance.text')
            const endAddress = get(legs, '[0].end_address')
            const duration = get(legs, '[0].duration.text')
            const message = `It will take ${duration} to get ${endAddress}, you will arrive at ${arrivalTime} (${distance}).`

            this.sendMessage(message, 'bot')
            this.sendMessage(message, 'bot', 'map', get(legs, '[0].end_location'))
        }
    }
    handleAlertMessage = async v => {
        const shouldHandle = blacklist.some(word => v.toLowerCase().includes(word))
        if (shouldHandle) {
            fetch(tyntecSmsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: tyntecApiKey,
                },
                body: JSON.stringify({
                    from: appCodeName,
                    to: phoneNumber,
                    message: 'Kid needs care!',
                }),
            })
        }
    }
    handleLevelUp = v => {
        if (v === levelUp) {
            this.setState({ levelUp: true })
        }
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
        this.handleLocation(v)
        this.handleLevelUp(v)
    }
    onFunnyImagePress = v => {
        this.sendMessage(v, 'bot', 'image', { uri: funnyImageUrl })
    }
    onFunnyVideoPress = v => {
        this.sendMessage(v, 'bot', 'video')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.msgContainer}>
                    <MessageList messages={this.state.messages} />
                </View>
                <View>
                    {this.state.levelUp && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 80 }}>
                            <Button onPress={this.onFunnyImagePress} title="Funny Picture" />
                            <Button onPress={this.onFunnyVideoPress} title="Funny Video" />
                        </View>
                    )}
                </View>
                <View>
                    <SendMessage onPress={this.onSendMessagePress} />
                </View>
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
        flex: 1,
        paddingTop: 44,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
})
