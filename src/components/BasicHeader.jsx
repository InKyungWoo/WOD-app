import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const backArrow = require('../assets/icons/back_arrow.png');

const BasicHeader = ({ title }) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={backArrow} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
                <View style={{ width: 40 }} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: '#FFF',
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b8bfe8',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 19.97,
        textAlign: 'center',
        color: '#3C215B',
    },
});

export default BasicHeader;
