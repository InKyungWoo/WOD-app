import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const logoImg = require('../assets/splash_logo.png');

const Splash = ({ navigation }) => {
    const { isLoading, user } = useAuth();
    const [minTimePassed, setMinTimePassed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimePassed(true);
        }, 2000); // 최소 3초 동안 Splash 화면을 보여줍니다

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading && minTimePassed) {
            if (user) {
                navigation.replace('MainTab');
            } else {
                navigation.replace('Auth');
            }
        }
    }, [isLoading, minTimePassed, user, navigation]);

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
