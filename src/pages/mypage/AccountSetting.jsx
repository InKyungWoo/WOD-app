import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import BasicHeader from '../../components/BasicHeader';

const { width } = Dimensions.get('window');
const saveIcon = require('../../assets/icons/save.png');

const AccountSetting = ({ navigation }) => {
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const handleSave = () => {
        console.log('Profile saved');
        navigation.goBack();
    };

    const handleLogout = () => {
        console.log('Logged out');
        // navigation.navigate('Login');
    };

    const handleDeleteAccount = () => {
        Alert.alert('회원 탈퇴', '정말로 탈퇴하시겠습니까? \n 이 작업은 되돌릴 수 없습니다.', [
            { text: '취소', style: 'cancel' },
            { text: '탈퇴', onPress: () => console.log('Account deleted') },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={{ justifyContent: 'center' }}>
                <BasicHeader title="프로필 설정" />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Image source={saveIcon} style={{ width: 36, height: 36 }} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>연락처</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    focusedInput === 'contact' && styles.focusedInput,
                                ]}
                                placeholder="연락처를 입력해주세요"
                                value={contact}
                                onChangeText={setContact}
                                keyboardType="numeric"
                                onFocus={() => setFocusedInput('contact')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>이메일</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    focusedInput === 'email' && styles.focusedInput,
                                ]}
                                placeholder="이메일 주소를 입력해주세요"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                onFocus={() => setFocusedInput('email')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>비밀번호</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    focusedInput === 'password' && styles.focusedInput,
                                ]}
                                placeholder="새 비밀번호를 입력해주세요"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                onFocus={() => setFocusedInput('password')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.option} onPress={handleLogout}>
                        <Text style={styles.optionText}>로그아웃</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={[styles.option, styles.deleteAccount]}
                        onPress={handleDeleteAccount}>
                        <Text style={[styles.optionText, styles.deleteAccountText]}>회원 탈퇴</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    saveButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },

    scrollViewContent: {
        flexGrow: 1,
    },
    inputContainer: {
        padding: 20,
        gap: 12,
        marginVertical: 16,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#5762D5',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#eceefb',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    focusedInput: {
        borderColor: '#5762D5',
    },
    divider: {
        width: '100%',
        height: 10,
        backgroundColor: '#F5F5F5',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EBEBEB',
    },
    option: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#3C215B',
    },
    deleteAccount: {},
    deleteAccountText: {
        color: 'red',
    },
});

export default AccountSetting;
