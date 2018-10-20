import * as React from 'react'
import { FlatList, Text, View, Image } from 'react-native'
import { Video, MapView } from 'expo'

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
                    ) : item.type === 'map' ? (
                        <MapView
                            style={{ width: 400, height: 200 }}
                            initialRegion={{
                                latitude: item.data.lat,
                                longitude: item.data.lng,
                                latitudeDelta: 0.04,
                                longitudeDelta: 0.05,
                            }}
                        />
                    ) : item.type === 'image' ? (
                        <Image source={{ uri: item.data.uri }} style={{ width: 400, height: 200 }} />
                    ) : item.type === 'video' ? (
                        <View style={{ alignSelf: 'center' }}>
                            <Video
                                source={require('../assets/video/funny.mp4')}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={{ width: 300, height: 300 }}
                            />
                        </View>
                    ) : null}
                </View>
            )}
        />
    )
}
