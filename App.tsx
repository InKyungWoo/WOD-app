import React from 'react';
import 'react-native-gesture-handler';
import Router from './src/router';

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';

function App(): React.JSX.Element {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;
