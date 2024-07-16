import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import CommentsModal from '../../components/CommentsModal';

const logo = require('../../assets/logo.png');
const heart = require('../../assets/icons/heart.png');
const comment = require('../../assets/icons/comment.png');
const more = require('../../assets/icons/more.png');

const { width } = Dimensions.get('window');

const dummy_feedData = [
    {
        id: 1,
        name: 'Jeongtaeyou',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
        ],
        contents: '내 마음...받아줘',
        like: 37,
        likeUsers: [1, 2, 3],
    },
    {
        id: 2,
        name: 'Jeongtaeyou',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
        ],
        contents: '내 마음...받아줘',
        like: 37,
        likeUsers: [1, 2, 3],
    },
    {
        id: 3,
        name: 'Jeongtaeyou',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
        ],
        contents: '내 마음...받아줘',
        like: 37,
        likeUsers: [1, 2, 3],
    },
];

const FeedHome = () => {
    const [isVisible, setIsVisible] = useState(false);

    const renderFeed = ({ item, index }) => {
        return (
            <View style={{ paddingVertical: 24 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: 16,
                        marginBottom: 8,
                    }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Image
                            source={{ uri: item.profileImg }}
                            style={{ width: 32, height: 32 }}
                        />
                        <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 19.97 }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={more} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
                <Image
                    source={{ uri: item.feedImg[0] }}
                    style={{ width, height: width, marginBottom: 8 }}
                    resizeMode="contain"
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        marginBottom: 22,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <TouchableOpacity>
                            <Image source={heart} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                            <Image source={comment} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    </View>
                    <Text>외 37명이 좋아합니다.</Text>
                </View>
                <View style={{ marginHorizontal: 16, gap: 4 }}>
                    <Text>{item.name}</Text>
                    <Text style={{ fontWeight: '400', color: '#4F4F4F' }}>{item.contents}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1, backgroundColor: '#FFF', marginBottom: 32 }}>
                <FlatList
                    data={dummy_feedData}
                    renderItem={renderFeed}
                    keyExtractor={item => item.id}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View>
                            <View
                                style={{
                                    padding: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // backgroundColor: 'red',
                                    borderBottomWidth: 1,
                                    borderColor: '#8d98d3',
                                }}>
                                <Image source={logo} style={{ width: 119, height: 30 }} />
                            </View>
                        </View>
                    )}
                />
                <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} />
            </View>
        </SafeAreaView>
    );
};

export default FeedHome;
