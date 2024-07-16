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
import LogoHeader from '../../components/LogoHeader';

const SignIn = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

        if (!email.includes('@')) {
            Alert.alert('유효하지 않은 이메일', '이메일 형식이 올바르지 않습니다.');
            return;
        }

        if (!passwordPattern.test(password)) {
            Alert.alert(
                '유효하지 않은 비밀번호',
                '비밀번호는 8자 이상이며\n최소 하나의 영어 소문자, 영어 대문자,\n특수 문자, 숫자를 포함해야 합니다.',
            );
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        // TODO: 회원가입 로직
        console.log('Registration attempt with:', username, email, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LogoHeader />
            <View style={styles.formContainer}>
                <Text style={styles.title}>회원가입</Text>
                <TextInput
                    style={styles.input}
                    placeholder="사용자 이름"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={[styles.input, { marginTop: 20 }]}
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
                <TextInput
                    style={[styles.input, { marginTop: 20 }]}
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>이미 계정이 있으신가요? 로그인</Text>
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
        marginTop: 40,
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

export default SignIn;
