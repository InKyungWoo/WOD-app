import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const logo = require('../assets/logo.png');

const LogoHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Image source={logo} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#8d98d3',
    },
    logo: {
        width: 119,
        height: 30,
    },
});

export default LogoHeader;
