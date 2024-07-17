import { API } from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 회원가입
export const signin = async data => {
    try {
        const response = await API.post('/accounts', data);
        if (response.ok) {
            return response.data;
        } else {
            throw new Error(response.data.message || '회원가입에 실패했습니다.');
        }
    } catch (error) {
        console.error('Signin error:', error);
        throw error;
    }
};

// 로그인
export const login = async user => {
    try {
        const response = await API.post('/auth', user);
        if (response.ok) {
            return response.data;
        } else {
            throw new Error(response.data.message || '로그인에 실패했습니다.');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// 로그아웃
export const logout = async () => {
    try {
        const response = await API.delete('/auth');
        if (response.ok) {
            // 저장된 토큰 제거
            await AsyncStorage.removeItem('userToken');
            return response.data;
        } else {
            throw new Error(response.data.message || '로그아웃에 실패했습니다.');
        }
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
