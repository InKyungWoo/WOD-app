import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import BasicHeader from '../../components/BasicHeader';

// 더미 메시지 데이터
const dummyMessages = [
    { id: '1', text: '안녕하세요!', sender: 'other', time: '14:30' },
    { id: '2', text: '네, 안녕하세요. 무슨 일이신가요?', sender: 'me', time: '14:31' },
    { id: '3', text: '프로젝트 관련해서 질문이 있어요.', sender: 'other', time: '14:32' },
    { id: '4', text: '네, 어떤 질문인가요?', sender: 'me', time: '14:33' },
];

const DmDetail = ({ route }) => {
    const { username } = route.params;

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.messageContainer,
                item.sender === 'me' ? styles.myMessage : styles.otherMessage,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <BasicHeader title={username} />
                <FlatList
                    data={dummyMessages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messageList}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    messageList: {
        padding: 15,
    },
    messageContainer: {
        maxWidth: '80%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#eceefb',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: '#999',
        alignSelf: 'flex-end',
        marginTop: 5,
    },
});

export default DmDetail;