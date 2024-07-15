import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';

import BasicHeader from '../../components/BasicHeader';

const PostFeed = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <BasicHeader title={'오운완 인증하기'} />
            </View>
        </SafeAreaView>
    );
};

export default PostFeed;
