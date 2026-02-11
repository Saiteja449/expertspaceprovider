import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'https://app.expertspace.in/api/v1/', // Replace with your actual base URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    async config => {
        // You can add authentication token here
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// Response interceptor
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            // Handle known error codes (e.g., 401 Unauthorized)
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            // Network error
            console.error('Network Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
