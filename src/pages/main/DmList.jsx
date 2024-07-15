import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BasicHeader from '../../components/BasicHeader';

// 더미 데이터
const dummyChats = [
    {
        id: '1',
        username: 'john_doe',
        lastMessage: '안녕하세요!',
        time: '14:30',
        avatar: 'https://picsum.photos/id/1/200',
    },
    {
        id: '2',
        username: 'jane_smith',
        lastMessage: '오늘 저녁에 시간 되세요?',
        time: '12:15',
        avatar: 'https://picsum.photos/id/2/200',
    },
    {
        id: '3',
        username: 'mike_johnson',
        lastMessage: '프로젝트 진행상황 어떤가요?',
        time: '어제',
        avatar: 'https://picsum.photos/id/3/200',
    },
    {
        id: '4',
        username: 'emily_brown',
        lastMessage: '주말에 뭐하세요?',
        time: '월요일',
        avatar: 'https://picsum.photos/id/4/200',
    },
];

const DmList = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('DmDetail', { username: item.username })}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BasicHeader />
            <View style={styles.container}>
                <FlatList
                    data={dummyChats}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
    chatItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    chatInfo: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    lastMessage: {
        fontSize: 14,
        color: '#666',
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
});

export default DmList;