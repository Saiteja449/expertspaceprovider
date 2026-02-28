import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../api/apiService';
import { initializeFCM, getFCMToken } from '../firebase/pushNotification';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initialize();
  }, [])

  const initialize = async () => {
    await initializeFCM();
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const deviceToken = await getFCMToken();
      const response = await apiService.post('/provider/login', {
        email,
        password,
        deviceToken: deviceToken || 'deviceToken',
      });
      console.log('Login Success:', response.data);
      if (!response.data) {
        return { success: false, message: 'Invalid response from server' };
      }
      let token = null;
      if (response.data.token) {
        token = response.data.token;
      } else if (response.data.data && response.data.data.token) {
        token = response.data.data.token;
      }
      if (!token) {
        return { success: false, message: 'No authentication token received' };
      }
      await AsyncStorage.setItem('token', token);
      setUser(response.data);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Login Error:', error);
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed';
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const fetchProviderProfile = async () => {
    try {
      const response = await apiService.get('provider/getProviderProfile');
      console.log('Provider Profile:', response.data);
      if (response.data && response.data.success) {
        const userData = response.data.data;
        setUser(userData);
        return { success: true };
      }
      return { success: false, status: response.data?.status };
    } catch (error) {
      console.error('Fetch Provider Profile Error:', error);
      if (error.response && error.response.data) {
        return {
          success: false,
          status: error.response.data.status,
          message: error.response.data.message,
        };
      }
      return { success: false };
    }
  };



  const signup = async payload => {
    setLoading(true);
    try {
      const deviceToken = await getFCMToken();
      const updatedPayload = {
        ...payload,
        deviceToken: deviceToken || 'deviceToken',
      };
      const response = await apiService.post('provider/signup', updatedPayload);
      console.log('Signup Response:', response.data);

      if (!response.data || !response.data.data) {
        return { success: false, message: 'Invalid response from server' };
      }

      const { token, provider_id } = response.data.data;

      if (token) {
        await AsyncStorage.setItem('token', token);
      }
      if (provider_id) {
        await AsyncStorage.setItem('provider_id', String(provider_id));
      }
      const profileResult = await fetchProviderProfile();

      if (profileResult && profileResult.status === 'pending') {
        return {
          success: true,
          navigate: 'ApprovalPendingScreen',
          data: response.data.data,
        };
      }

      return {
        success: true,
        navigate: 'MainTabs',
        data: response.data.data,
      };
    } catch (error) {
      console.error('Signup Error:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Registration failed. Please try again.';
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return { success: false, navigate: 'LoginScreen' };
      }

      const result = await fetchProviderProfile();

      if (result && result.success) {
        return { success: true, navigate: 'MainTabs' };
      } else if (result && result.status === 'pending') {
        return { success: true, navigate: 'ApprovalPendingScreen' };
      } else {
        return { success: false, navigate: 'LoginScreen' };
      }
    } catch (error) {
      console.error('Check Login Error:', error);
      return { success: false, navigate: 'LoginScreen' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userData');
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout Error:', error);
      return { success: false, message: 'Failed to logout' };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isConnected,
        setIsConnected,
        loading,
        setLoading,
        login,
        signup,
        checkLogin,
        fetchProviderProfile,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
