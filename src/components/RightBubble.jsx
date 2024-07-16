import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MessageBubble = ({ message, onAudioPress }) => {
    if (message.image) {
        return (
            <Image
                source={{ uri: message.image }}
                style={{ width: 200, height: 200, borderRadius: 10 }}
            />
        );
    } else if (message.audio) {
        return (
            <TouchableOpacity onPress={() => onAudioPress(message.audio)}>
                <Text style={styles.audioText}>음성 메시지 재생</Text>
            </TouchableOpacity>
        );
    }
    return <Text style={styles.messageText}>{message.text}</Text>;
};

const RightBubble = ({ message, prevMessage, nextMessage, onAudioPress }) => {
    const showInfo = !nextMessage || nextMessage.sender !== 'me';

    return (
        <View style={styles.container}>
            {showInfo && (
                <View style={styles.infoWrapper}>
                    <Text style={styles.readStatus}>{message.isRead ? '읽음' : '읽지 않음'}</Text>
                    <View style={styles.microBar} />
                    <Text style={styles.messageTime}>{message.time}</Text>
                </View>
            )}
            <View style={styles.messageContainer}>
                <MessageBubble message={message} onAudioPress={onAudioPress} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    infoWrapper: {
        flexDirection: 'row',
        marginTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        marginRight: 4,
    },
    messageContainer: {
        backgroundColor: '#eceefb',
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 15,
        color: '#414141',
        lineHeight: 22.5,
    },
    audioText: {
        fontSize: 15,
        color: '#414141',
        lineHeight: 22.5,
        textDecorationLine: 'underline',
    },
    messageTime: {
        fontSize: 10,
        color: '#737373',
        lineHeight: 14.98,
    },
    readStatus: {
        fontSize: 10,
        color: '#737373',
        lineHeight: 14.98,
    },
    microBar: {
        width: 1,
        height: 4,
        backgroundColor: '#D5D5D5',
    },
});

export default RightBubble;