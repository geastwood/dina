import * as React from 'react'
import { FlatList, Text, View } from 'react-native'

const styles = {
    base: {
        paddingVertical: 8,
    },
    left: {
        alignSelf: 'flex-start',
    },
    right: {
        alignSelf: 'flex-end',
    },
}
export default ({ messages }) => {
    console.log(messages)
    return (
        <FlatList
            inverted
            data={messages}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
                <View style={[styles.base, item.sender === 'me' ? styles.right : styles.left]}>
                    <Text
                        style={{
                            fontSize: 18,
                        }}
                    >
                        {item.msg}
                    </Text>
                </View>
            )}
        />
    )
}
