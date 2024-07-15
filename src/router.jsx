import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from './components/CustomBottomTab';

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

const renderTabBar = props => <CustomBottomTab {...props} />;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator tabBar={renderTabBar} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="홈" component={FeedHome} />
            <Tab.Screen name="검색" component={SearchFeed} />
            <Tab.Screen name="추가" component={PostFeed} />
            <Tab.Screen name="DM" component={DmList} />
            <Tab.Screen name="마이페이지" component={MyPage} />
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
