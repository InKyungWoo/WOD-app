import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import LogoHeader from '../../components/LogoHeader';
import { login as loginAPI } from '../../apis/auth';
import { setUserToken } from '../../apis/token';

const Login = ({ navigation }) => {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await loginAPI({ email, password });
            console.log('Login response:', res);
            if (res.success) {
                await setUserToken('userToken', res.token);
                await login(res.token); // AuthContext의 login 함수 호출
                Alert.alert('로그인 성공', '로그인이 완료되었습니다.', [
                    { text: '확인', onPress: () => navigation.navigate('MainTab') },
                ]);
            } else {
                Alert.alert('로그인 실패', res.error || '이메일 또는 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            console.error('Failed to login', error);
            Alert.alert('오류', '로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
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
                <TouchableOpacity
                    style={[styles.button, loading && styles.disabledButton]}
                    onPress={handleLogin}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>로그인</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.linkText}>계정이 없으신가요?{'\n'}➡️ 회원가입</Text>
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
        borderColor: '#b6bde3',
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
        lineHeight: 24,
        textAlign: 'center',
    },
    disabledButton: {
        backgroundColor: '#A0A0A0',
    },
});

export default Login;
