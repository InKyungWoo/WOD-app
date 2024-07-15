import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeftBubble = ({ message, prevMessage, nextMessage }) => {
    const showInfo = !nextMessage || nextMessage.sender !== 'other';

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{message.text}</Text>
            </View>
            {showInfo && (
                <View style={styles.infoWrapper}>
                    <Text style={styles.messageTime}>{message.time}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    messageContainer: {
        backgroundColor: '#ECECEC',
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 15,
        color: '#414141',
        lineHeight: 22.5,
    },
    infoWrapper: {
        flexDirection: 'row',
        marginTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    messageTime: {
        fontSize: 10,
        color: '#737373',
        lineHeight: 14.98,
    },
});

export default LeftBubble;
