import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BasicHeader from '../../components/BasicHeader';
import { dummyChats } from '../../apis/dummyChats';

const { height } = Dimensions.get('window');

const DmList = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        const lastMessage = item.messages[item.messages.length - 1];
        const messageText =
            lastMessage.text ||
            (lastMessage.image
                ? '이미지를 보냈습니다.'
                : lastMessage.audio
                ? '음성 메시지를 보냈습니다.'
                : '');

        return (
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => navigation.navigate('DmDetail', { userId: item.id })}>
                <Image source={{ uri: item.profile }} style={styles.profile} />
                <View style={styles.chatInfo}>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.lastMessage} numberOfLines={2} ellipsizeMode="tail">
                        {messageText}
                    </Text>
                </View>
                <Text style={styles.time}>{lastMessage.time}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BasicHeader title={'Direct Messages'} />
            <View style={styles.container}>
                <FlatList
                    data={dummyChats}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ height: height + 16 }}
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
    profile: {
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
