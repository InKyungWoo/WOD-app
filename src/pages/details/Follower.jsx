import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BasicHeader from '../../components/BasicHeader';

const Tab = createMaterialTopTabNavigator();

// 팔로워 더미 데이터
const dummyFollowers = [
    { id: '1', username: 'Lucymartin_3', avatar: 'https://picsum.photos/130/130' },
    { id: '2', username: 'John_Doe', avatar: 'https://picsum.photos/131/131' },
    { id: '3', username: 'Alice_Wonder', avatar: 'https://picsum.photos/132/132' },
    { id: '4', username: 'Bob_Builder', avatar: 'https://picsum.photos/133/133' },
    { id: '5', username: 'Emma_Watson', avatar: 'https://picsum.photos/134/134' },
];

// 팔로잉 더미 데이터
const dummyFollowing = [
    { id: '1', username: 'MichaelJordan', avatar: 'https://picsum.photos/135/135' },
    { id: '2', username: 'SerenaWilliams', avatar: 'https://picsum.photos/136/136' },
    { id: '3', username: 'LionelMessi', avatar: 'https://picsum.photos/137/137' },
    { id: '4', username: 'UsainBolt', avatar: 'https://picsum.photos/138/138' },
    { id: '5', username: 'SimoneBiles', avatar: 'https://picsum.photos/139/139' },
];

const UserItem = ({ item, isFollowing }) => (
    <View style={styles.userRow}>
        <TouchableOpacity style={styles.userInfo}>
            <Image
                source={{ uri: item.avatar }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <Text>{item.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.followButton}>
            <Text>{isFollowing ? '팔로잉' : '팔로우 취소'}</Text>
        </TouchableOpacity>
    </View>
);

const FollowerTab = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 10 }}>
            <FlatList
                data={dummyFollowers}
                renderItem={({ item }) => <UserItem item={item} isFollowing={false} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const FollowingTab = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 10 }}>
            <FlatList
                data={dummyFollowing}
                renderItem={({ item }) => <UserItem item={item} isFollowing={true} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const Follower = ({ route, navigation }) => {
    const initialTab = route.params?.initialTab || '팔로워';

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader title={'chacha._.inkyung'} />
            <Tab.Navigator
                initialRouteName={initialTab}
                screenOptions={{
                    tabBarInactiveTintColor: '#828282',
                    tabBarActiveTintColor: '#333333',
                    tabBarIndicatorStyle: {
                        backgroundColor: '#4F4F4F',
                        width: 100,
                        marginLeft: 60,
                        height: 1,
                    },
                    tabBarStyle: { marginBottom: 10 },
                }}>
                <Tab.Screen
                    name="팔로워"
                    component={FollowerTab}
                    options={{ tabBarLabel: '5 팔로워' }}
                />
                <Tab.Screen
                    name="팔로잉"
                    component={FollowingTab}
                    options={{ tabBarLabel: '5 팔로잉' }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    userRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
    },
    followButton: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        padding: 8,
    },
});

export default Follower;
