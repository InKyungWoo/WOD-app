import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BasicHeader from '../../components/BasicHeader';

const logo = require('../../assets/logo.png');

const FeedHome = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <View style={styles.headerWrapper}>
                    <Image source={logo} style={{ width: 90, height: 22.66 }} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
});

export default FeedHome;
