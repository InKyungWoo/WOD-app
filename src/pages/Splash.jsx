import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const logoImg = require('../assets/splash_logo.png');

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('MainTab');
        }, 2000);
    });

    return (
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logoImg} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFEFE',
    },
    logoImg: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default Splash;
