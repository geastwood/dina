import * as React from 'react'
import { Platform, TextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'expo'

const grid = 8
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: grid * 2,
        paddingHorizontal: grid * 2,
        paddingTop: grid * 2,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        maxHeight: 96,
        alignSelf: 'center',
        padding: 0,
        paddingBottom: 4,
        margin: 0,
        borderWidth: 0,
    },
    sender: {
        paddingRight: grid,
        alignSelf: 'flex-end',
    },
    icon: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    sendContainer: {
        paddingBottom: grid,
        paddingHorizontal: grid * 2,
        paddingTop: grid,
        borderTopWidth: 1,
    },
})

class SendMessage extends React.PureComponent {
    state = {
        val: '',
    }
    onChangeText = val => {
        this.setState({ val })
    }
    onSubmit = val => {
        this.props.onPress(val)
        this.setState({ val: '' })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="write something"
                    value={this.state.val}
                    onChangeText={val => this.onChangeText(val)}
                    underlineColorAndroid="transparent"
                    returnKeyLabel="send"
                    enablesReturnKeyAutomatically
                    blurOnSubmit={false}
                />
                <TouchableOpacity onPress={() => this.onSubmit(this.state.val)} style={styles.icon}>
                    <Icon.Ionicons
                        name={Platform.OS === 'ios' ? 'ios-send' : 'md-ios-send'}
                        size={26}
                        style={{ marginBottom: -3 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default SendMessage
