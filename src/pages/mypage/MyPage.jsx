import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
} from 'react-native';

const settingsIcon = require('../../assets/icons/settings.png');
const myProfile = require('../../assets//images/bommy.jpeg');

// 임시 데이터
const posts = Array(15)
    .fill()
    .map((_, index) => ({
        id: index.toString(),
        image: `https://picsum.photos/500/500?random=${index}`,
    }));

const { width } = Dimensions.get('window');

const Mypage = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <Image
            source={{ uri: item.image }}
            style={{
                width: width / 3 - 2,
                height: width / 3 - 2,
                margin: 1,
            }}
        />
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1 }}>
                {/* 상단 헤더 */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        marginBottom: 16,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderColor: '#8d98d3',
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', lineHeight: 19.97 }}>
                        chacha._.inkyung
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Image source={settingsIcon} style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                </View>

                {/* 프로필 정보 */}
                <View
                    style={{
                        marginHorizontal: 16,
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View>
                        <Image
                            source={myProfile}
                            style={{ width: 80, height: 80, borderRadius: 30, marginBottom: 4 }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <TouchableOpacity style={{ alignItems: 'center', gap: 2 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3C215B' }}>
                                {posts.length}
                            </Text>
                            <Text style={{ fontSize: 12, color: '#5762D5' }}>게시물</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Follower', { initialTab: '팔로워' })
                            }
                            style={{ alignItems: 'center', gap: 2 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3C215B' }}>
                                1204
                            </Text>
                            <Text style={{ fontSize: 12, color: '#5762D5' }}>팔로워</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Follower', { initialTab: '팔로잉' })
                            }
                            style={{ alignItems: 'center', gap: 2 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3C215B' }}>
                                542
                            </Text>
                            <Text style={{ fontSize: 12, color: '#5762D5' }}>팔로잉</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 내 게시물 */}
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    style={{ marginTop: 20 }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Mypage;
