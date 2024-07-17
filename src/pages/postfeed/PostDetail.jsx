import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backArrow = require('../../assets/icons/back_arrow.png');

const PostDetail = ({ route, navigation }) => {
    const { selectedPhoto } = route.params;
    const [caption, setCaption] = useState('');

    const handlePost = async () => {
        try {
            // 기존 게시물 가져오기
            const existingPosts = await AsyncStorage.getItem('userPosts');
            let posts = existingPosts ? JSON.parse(existingPosts) : [];

            const newPost = {
                id: Date.now().toString(),
                image: selectedPhoto.uri,
                caption: caption,
                createdAt: new Date().toISOString(),
            };
            posts.unshift(newPost);

            // 업데이트된 게시물 저장
            await AsyncStorage.setItem('userPosts', JSON.stringify(posts));

            Alert.alert('성공', '게시물이 업로드되었습니다.', [
                { text: 'OK', onPress: () => navigation.navigate('MyPage') },
            ]);
        } catch (error) {
            console.error('Error posting:', error);
            Alert.alert('오류', '게시물 업로드 중 오류가 발생했습니다.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={backArrow} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>새 게시물</Text>
                <TouchableOpacity onPress={handlePost}>
                    <Text style={styles.postButton}>게시</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Image source={{ uri: selectedPhoto.uri }} style={styles.selectedImage} />
                <TextInput
                    style={styles.captionInput}
                    placeholder="문구 입력..."
                    value={caption}
                    onChangeText={setCaption}
                    multiline
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ECECEC',
    },
    backArrow: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postButton: {
        fontSize: 16,
        color: '#5762D5',
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    selectedImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    captionInput: {
        height: 100,
        borderColor: '#ECECEC',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        textAlignVertical: 'top',
    },
});

export default PostDetail;
