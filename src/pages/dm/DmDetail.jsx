import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import BasicHeader from '../../components/BasicHeader';

import LeftBubble from '../../components/LeftBubble';
import RightBubble from '../../components/RightBubble';

// 더미 메시지 데이터 (isRead 속성 추가)
const dummyMessages = [
    { id: '1', text: '안녕하세요!', sender: 'other', time: '14:30', isRead: true },
    {
        id: '2',
        text: '네, 안녕하세요. 무슨 일이신가요?',
        sender: 'me',
        time: '14:31',
        isRead: true,
    },
    {
        id: '3',
        text: '프로젝트 관련해서 질문이 있어요.',
        sender: 'other',
        time: '14:32',
        isRead: true,
    },
    { id: '4', text: '네, 어떤 질문인가요?', sender: 'me', time: '14:33', isRead: false },
];

const DmDetail = ({ route }) => {
    const { username } = route.params;

    const renderMessage = ({ item, index }) => {
        const prevMessage = index > 0 ? dummyMessages[index - 1] : null;
        const nextMessage = index < dummyMessages.length - 1 ? dummyMessages[index + 1] : null;

        if (item.sender === 'me') {
            return (
                <RightBubble message={item} prevMessage={prevMessage} nextMessage={nextMessage} />
            );
        } else {
            return <LeftBubble message={item} prevMessage={prevMessage} />;
        }
    };

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
});

export default DmDetail;