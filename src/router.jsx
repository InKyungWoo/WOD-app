import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 초기 화면
import Splash from './pages/Splash';

// 메인 탭 화면
import FeedHome from './pages/main/FeedHome';
import PostFeed from './pages/main/PostFeed';
import SearchFeed from './pages/main/SearchFeed';
import DmList from './pages/main/DmList';
import MyPage from './pages/main/MyPage';

// 상세 화면
import DmDetail from './pages/details/DmDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="FeedHome" component={FeedHome} />
            <Tab.Screen name="SearchFeed" component={SearchFeed} />
            <Tab.Screen name="PostFeed" component={PostFeed} />
            <Tab.Screen name="Dm" component={DmList} />
            <Tab.Screen name="MyPage" component={MyPage} />
        </Tab.Navigator>
    );
};

const Router = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="DmDetail" component={DmDetail} />
        </Stack.Navigator>
    );
};

export default Router;
