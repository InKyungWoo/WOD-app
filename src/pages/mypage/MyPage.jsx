import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const settingsIcon = require('../../assets/icons/settings.png');
const defaultProfile = require('../../assets//images/tempProfile.png');

// 임시 데이터
// const posts = Array(15)
//     .fill()
//     .map((_, index) => ({
//         id: index.toString(),
//         image: `https://picsum.photos/500/500?random=${index}`,
//     }));

const { width } = Dimensions.get('window');

const Mypage = ({ navigation }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [posts, setPosts] = useState([]);

    const loadProfileData = async () => {
        try {
            const savedImage = await AsyncStorage.getItem('profileImage');
            const savedName = await AsyncStorage.getItem('profileName');
            const savedBio = await AsyncStorage.getItem('profileBio');
            const savedPosts = await AsyncStorage.getItem('userPosts');

            if (savedImage) setProfileImage(savedImage);
            if (savedName) setName(savedName);
            if (savedBio) setBio(savedBio);
            if (savedPosts) setPosts(JSON.parse(savedPosts));
        } catch (error) {
            console.error('Error loading profile data:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadProfileData();
        }, []),
    );

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
            <View>
                {/* 상단 헤더 */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>chacha</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Image source={settingsIcon} style={styles.settingsIcon} />
                    </TouchableOpacity>
                </View>

                {/* 프로필 정보 */}
                <View style={styles.profileInfo}>
                    <View>
                        <Image
                            source={profileImage ? { uri: profileImage } : defaultProfile}
                            style={styles.profileImage}
                        />
                    </View>
                    <View style={styles.statsContainer}>
                        <TouchableOpacity style={styles.statsItem}>
                            <Text style={styles.statsNumber}>{posts.length}</Text>
                            <Text style={styles.statsLabel}>게시물</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Follower', { initialTab: '팔로워' })
                            }
                            style={styles.statsItem}>
                            <Text style={styles.statsNumber}>5</Text>
                            <Text style={styles.statsLabel}>팔로워</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Follower', { initialTab: '팔로잉' })
                            }
                            style={styles.statsItem}>
                            <Text style={styles.statsNumber}>5</Text>
                            <Text style={styles.statsLabel}>팔로잉</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 이름과 소개 */}
                <View style={styles.bioContainer}>
                    {name && <Text style={styles.nameText}>{name}</Text>}
                    {bio && <Text style={styles.bioText}>{bio}</Text>}
                </View>

                {/* 내 게시물 */}
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    style={styles.postsList}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#8d98d3',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 19.97,
    },
    settingsIcon: {
        width: 32,
        height: 32,
    },
    profileInfo: {
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 30,
        marginBottom: 4,
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    statsItem: {
        alignItems: 'center',
        gap: 2,
    },
    statsNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3C215B',
    },
    statsLabel: {
        fontSize: 12,
        color: '#5762D5',
    },
    bioContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    nameText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3C215B',
        marginBottom: 4,
    },
    bioText: {
        fontSize: 14,
        color: '#3C215B',
    },
    postsList: {
        marginTop: 20,
    },
});


export default Mypage;
