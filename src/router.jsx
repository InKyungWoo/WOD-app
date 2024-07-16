import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from './components/CustomBottomTab';

// 초기 화면
import Splash from './pages/Splash';

// 메인 탭 화면
import FeedHome from './pages/home/FeedHome';
import PostFeed from './pages/postfeed/PostFeed';
import SearchFeed from './pages/search/SearchFeed';
import SearchList from './pages/search/SearchList';
import DmList from './pages/dm/DmList';
import DmDetail from './pages/dm/DmDetail';
import MyPage from './pages/mypage/MyPage';
import Follower from './pages/mypage/Follower';
import Settings from './pages/mypage/Settings';
import ProfileEdit from './pages/mypage/ProfileEdit';
import AccountSetting from './pages/mypage/AccountSetting';
import { useNavigationState } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getActiveRouteName = state => {
    const route = state.routes[state.index];
    if (route.state) {
        return getActiveRouteName(route.state);
    }
    return route.name;
};

// 메인 탭 네비게이터
const MainTab = () => {
    const state = useNavigationState(state => state);
    const currentRouteName = getActiveRouteName(state);

    return (
        <Tab.Navigator
            tabBar={props => {
                if (currentRouteName === 'DmDetail') {
                    return null;
                }
                return <CustomBottomTab {...props} />;
            }}
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="홈" component={HomeStack} />
            <Tab.Screen name="검색" component={SearchStack} />
            <Tab.Screen name="추가" component={PostFeed} />
            <Tab.Screen name="DM" component={DMStack} />
            <Tab.Screen name="마이페이지" component={MyPageStack} />
        </Tab.Navigator>
    );
};

// 홈 탭
const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FeedHome" component={FeedHome} />
    </Stack.Navigator>
);

// 검색 탭
const SearchStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SearchFeed" component={SearchFeed} />
        <Stack.Screen name="SearchList" component={SearchList} />
    </Stack.Navigator>
);

// DM 탭
const DMStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DmList" component={DmList} />
        <Stack.Screen name="DmDetail" component={DmDetail} />
    </Stack.Navigator>
);

// 마이페이지 탭
const MyPageStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="Follower" component={Follower} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="AccountSetting" component={AccountSetting} />
    </Stack.Navigator>
);

// 루트 네비게이터
const Router = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="MainTab" component={MainTab} />
        </Stack.Navigator>
    );
};

export default Router;