import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CommentsModal from '../../components/CommentsModal';
import LogoHeader from '../../components/LogoHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('../../assets/logo.png');
const heart_empty = require('../../assets/icons/heart_empty.png');
const heart_filled = require('../../assets/icons/heart_filled.png');
const comment = require('../../assets/icons/comment.png');
const more = require('../../assets/icons/more.png');

const { width } = Dimensions.get('window');

const dummy_feedData = [
    {
        id: 1,
        name: 'Jeongtaeyou',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400?random=1',
            'https://picsum.photos/400/400?random=2',
            'https://picsum.photos/400/400?random=3',
        ],
        contents: '건강한 마음, 건강한 정신 😎',
        hashtags: ['wod', '오운완', '헬시플레져'],
        like: 37,
        likeUsers: [1, 2, 3],
        isLiked: false,
        comments: [],
    },
    {
        id: 2,
        name: 'Kimminsu',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400?random=4',
            'https://picsum.photos/400/400?random=5',
        ],
        contents: '오늘의 운동 완료!',
        hashtags: ['wod', '오운완', 'daily', '헬스'],
        like: 52,
        likeUsers: [1, 2, 3, 4],
        isLiked: false,
        comments: [],
    },
    {
        id: 3,
        name: 'Parkjihye',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400?random=6',
            'https://picsum.photos/400/400?random=7',
            'https://picsum.photos/400/400?random=8',
            'https://picsum.photos/400/400?random=9',
        ],
        contents: '오늘의 OOTD',
        hashtags: [],
        like: 89,
        likeUsers: [1, 2, 3, 4, 5],
        isLiked: false,
        comments: [],
    },
];

const FeedHome = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSlide, setActiveSlide] = useState({});
    const [feeds, setFeeds] = useState(dummy_feedData);
    const [selectedFeed, setSelectedFeed] = useState(null);

    useEffect(() => {
        loadFeeds();
    }, []);

    const loadFeeds = async () => {
        try {
            const savedFeeds = await AsyncStorage.getItem('feeds');
            if (savedFeeds !== null) {
                setFeeds(JSON.parse(savedFeeds));
            } else {
                // 처음 실행 시 더미 데이터 저장
                await AsyncStorage.setItem('feeds', JSON.stringify(dummy_feedData));
            }
        } catch (error) {
            console.error('Error loading feeds:', error);
        }
    };

    const saveFeeds = async updatedFeeds => {
        try {
            await AsyncStorage.setItem('feeds', JSON.stringify(updatedFeeds));
        } catch (error) {
            console.error('Error saving feeds:', error);
        }
    };

    const toggleLike = feedId => {
        const updatedFeeds = feeds.map(feed =>
            feed.id === feedId
                ? {
                      ...feed,
                      isLiked: !feed.isLiked,
                      like: feed.isLiked ? feed.like - 1 : feed.like + 1,
                  }
                : feed,
        );
        setFeeds(updatedFeeds);
        saveFeeds(updatedFeeds);
    };

    const handleClickHashtag = tag => {
        console.log(`해시태그 클릭: ${tag}`);
        // 해시태그 클릭시 태그 검색 구현
    };

    const renderCarouselItem = ({ item, index }) => {
        return <Image source={{ uri: item }} style={{ width, height: width }} resizeMode="cover" />;
    };

    const handleCommentPress = feed => {
        setSelectedFeed(feed);
        setIsVisible(true);
    };

    const updateFeed = updatedFeed => {
        const updatedFeeds = feeds.map(feed =>
            feed.id === updatedFeed.id ? { ...feed, ...updatedFeed } : feed,
        );
        setFeeds(updatedFeeds);
        saveFeeds(updatedFeeds);
    };

    const renderFeed = ({ item, index }) => {
        return (
            <View>
                {/* 프로필 정보 */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderTopWidth: 0.2,
                        borderColor: '#8d98d3',
                    }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Image
                            source={{ uri: item.profileImg }}
                            style={{ width: 32, height: 32 }}
                        />
                        <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 19.97 }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={more} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>

                {/* 피드 이미지 캐러셀 */}
                <View>
                    <Carousel
                        data={item.feedImg}
                        renderItem={renderCarouselItem}
                        sliderWidth={width}
                        itemWidth={width}
                        onSnapToItem={index => setActiveSlide({ ...activeSlide, [item.id]: index })}
                    />
                    <Pagination
                        dotsLength={item.feedImg.length}
                        activeDotIndex={activeSlide[item.id] || 0}
                        containerStyle={{ paddingVertical: 8 }}
                        dotStyle={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginHorizontal: 1,
                            backgroundColor: '#5E22A2',
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                </View>

                {/* 좋아요, 댓글 */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        marginBottom: 22,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <TouchableOpacity onPress={() => toggleLike(item.id)}>
                            <Image
                                source={item.isLiked ? heart_filled : heart_empty}
                                style={{ width: 32, height: 32 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleCommentPress(item)}>
                            <Image source={comment} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 13, color: '#4F4F4F' }}>
                        {item.like}명이 좋아합니다
                    </Text>
                </View>

                {/* 피드 내용 */}
                <View style={{ marginHorizontal: 16, gap: 6, marginBottom: 24 }}>
                    <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                    <Text style={{ fontWeight: '400', color: '#4F4F4F' }}>{item.contents}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
                        {item.hashtags.map((tag, idx) => (
                            <TouchableOpacity
                                key={`${idx}`}
                                onPress={() => handleClickHashtag(tag)}>
                                <Text
                                    style={{
                                        paddingVertical: 4,
                                        paddingHorizontal: 8,
                                        marginRight: 8,
                                        fontSize: 14,
                                        color: '#5762D5',
                                        backgroundColor: '#fdf5ff',
                                        borderRadius: 30,
                                    }}>
                                    # {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1, backgroundColor: '#FFF', marginBottom: 32 }}>
                <FlatList
                    data={feeds}
                    renderItem={renderFeed}
                    keyExtractor={item => item.id.toString()}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => <LogoHeader />}
                />
                <CommentsModal
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    feed={selectedFeed}
                    updateFeed={updateFeed}
                />
            </View>
        </SafeAreaView>
    );
};

export default FeedHome;
