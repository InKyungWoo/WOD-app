import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserToken, setUserToken, removeUserToken } from '../apis/token';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const userToken = await getUserToken('userToken');
                if (userToken) {
                    setUser(userToken);
                }
            } catch (error) {
                console.log('Failed to get user token', error);
            } finally {
                setTimeout(() => setIsLoading(false), 2000);
            }
        };

        initializeAuth();
    }, []);

    const login = async userToken => {
        try {
            await setUserToken('userToken', userToken);
            setUser(userToken);
            return true;
        } catch (error) {
            console.log('Failed to login', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await removeUserToken('userToken');
            setUser(null);
        } catch (error) {
            console.log('Failed to logout', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
