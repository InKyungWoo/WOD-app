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
import LogoHeader from '../../components/LogoHeader';
import { signin } from '../../apis/auth';
import { useAuth } from '../../context/AuthContext';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth;

    // 유효성 검사
    const validateInput = () => {
        const emailPattern =
            /^(?=.{1,100}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}$/;
        const nicknamePattern = /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$/;
        const phoneNumberPattern = /^\d{9,20}$/;

        if (!emailPattern.test(email)) {
            Alert.alert('유효하지 않은 이메일', '올바른 이메일 형식을 입력해주세요.');
            return false;
        }

        if (!passwordPattern.test(password)) {
            Alert.alert(
                '유효하지 않은 비밀번호',
                '비밀번호는 8~20자이며, 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
            );
            return false;
        }

        if (!nicknamePattern.test(nickname)) {
            Alert.alert(
                '유효하지 않은 닉네임',
                '닉네임은 2~10자의 한글, 영문 소문자, 숫자, 특수문자(-_)만 사용 가능합니다.',
            );
            return false;
        }

        if (!phoneNumberPattern.test(phoneNumber)) {
            Alert.alert('유효하지 않은 전화번호', '전화번호는 9~20자의 숫자만 입력 가능합니다.');
            return false;
        }

        return true;
    };

    const handleSingin = async () => {
        if (!validateInput()) return;

        setLoading(true);
        try {
            const response = await signin({ email, password, nickname, phoneNumber });
            Alert.alert('성공', '회원가입이 완료되었습니다.', [
                {
                    text: 'OK',
                    onPress: () => login(response),
                },
            ]);
        } catch (error) {
            Alert.alert('오류', error.message || '회원가입 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LogoHeader />
            <View style={styles.formContainer}>
                <Text style={styles.title}>회원가입</Text>
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
                <TextInput
                    style={[styles.input, { marginTop: 20 }]}
                    placeholder="닉네임"
                    value={nickname}
                    onChangeText={setNickname}
                />
                <TextInput
                    style={[styles.input, { marginTop: 20 }]}
                    placeholder="전화번호"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                <TouchableOpacity
                    style={[styles.button, loading && styles.disabledButton]}
                    onPress={handleSingin}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>회원가입</Text>
                    )}
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
