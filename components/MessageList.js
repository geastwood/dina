import * as React from 'react'
import { FlatList, Text, View } from 'react-native'
import { MapView } from 'expo'

const styles = {
    base: {
        paddingVertical: 16,
    },
    left: {
        alignSelf: 'flex-start',
    },
    right: {
        alignSelf: 'flex-end',
    },
}
export default ({ messages }) => {
    return (
        <FlatList
            inverted
            data={messages}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
                <View style={[styles.base, item.sender === 'me' ? styles.right : styles.left]}>
                    {item.type === 'text' ? (
                        <Text
                            style={{
                                fontSize: 18,
                            }}
                        >
                            {item.msg}
                        </Text>
                    ) : (
                        <MapView
                            style={{ width: 400, height: 200 }}
                            initialRegion={{
                                latitude: item.data.lat,
                                longitude: item.data.lng,
                                latitudeDelta: 0.04,
                                longitudeDelta: 0.05,
                            }}
                        />
                    )}
                </View>
            )}
        />
    )
}
