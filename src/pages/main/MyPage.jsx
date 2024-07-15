import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';

import BasicHeader from '../../components/BasicHeader';

const MyPage = () => {
    return (
        <SafeAreaView>
            <View>
                <BasicHeader title={'My Page'} />
            </View>
        </SafeAreaView>
    );
};

export default MyPage;
