import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../api/apiService';

const Context = createContext();

export const Provider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isConnected, setIsConnected] = useState(true);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await apiService.post('/provider/login', {
                email,
                password,
                deviceToken: 'deviceToken',
            });
            console.log('Login Success:', response.data);

            // Store token if available in response
            if (response.data && response.data.token) {
                await AsyncStorage.setItem('token', response.data.token);
            } else if (response.data && response.data.data && response.data.data.token) {
                await AsyncStorage.setItem('token', response.data.data.token);
            }

            setUser(response.data);
            await AsyncStorage.setItem('userData', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Check if user is already logged in
    const checkUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Check User Error:', error);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    // Fetch provider profile
    const fetchProviderProfile = async () => {
        try {
            const response = await apiService.get('provider/getProviderProfile');
            console.log('Provider Profile:', response.data);
            if (response.data && response.data.success) {
                const userData = response.data.data;
                setUser(userData);
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                return { success: true };
            }
            return { success: false, status: response.data?.status };
        } catch (error) {
            console.error('Fetch Provider Profile Error:', error);
            // Check if error response contains status
            if (error.response && error.response.data) {
                return {
                    success: false,
                    status: error.response.data.status,
                    message: error.response.data.message
                };
            }
            return { success: false };
        }
    };

    // Example function to fetch user data using axios
    const fetchUser = async (userId) => {
        try {
            setLoading(true);
            // const response = await apiService.get(`/users/${userId}`);
            // setUser(response.data);
        } catch (error) {
            console.error('Fetch User Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Context.Provider
            value={{
                user,
                setUser,
                isConnected,
                setIsConnected,
                loading,
                setLoading,
                login,
                fetchUser,
                fetchProviderProfile,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useContextState = () => useContext(Context);

export default Context;
