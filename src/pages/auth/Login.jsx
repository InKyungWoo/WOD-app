import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import LogoHeader from '../../components/LogoHeader';

const Login = ({ navigation }) => {
    const { login } = useAuth;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email.includes('@')) {
            Alert.alert('유효하지 않은 이메일', '이메일 형식이 올바르지 않습니다.');
            return;
        }

        if (password.length < 8) {
            Alert.alert('유효하지 않은 비밀번호', '비밀번호는 8자 이상이어야 합니다.');
            return;
        }

        // TODO: 로그인 로직
        console.log('Login attempt with:', email, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LogoHeader />
            <View style={styles.formContainer}>
                <Text style={styles.title}>로그인</Text>
                <TextInput
                    style={styles.input}
                    placeholder="이메일"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={[styles.input, { marginTop: 20 }]}
                    placeholder="비밀번호"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.linkText}>계정이 없으신가요? 회원가입</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        color: '#3C215B',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#5865AC',
        padding: 12,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginVertical: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    linkText: {
        color: '#5865AC',
        fontSize: 16,
    },
});

export default Login;
