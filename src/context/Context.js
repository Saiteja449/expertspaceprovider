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
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useContextState = () => useContext(Context);

export default Context;
