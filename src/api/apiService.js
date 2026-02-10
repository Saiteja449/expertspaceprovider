import axiosInstance from './axiosInstance';

const apiService = {
    get: (url, params = {}) => axiosInstance.get(url, { params }),
    post: (url, data) => axiosInstance.post(url, data),
    put: (url, data) => axiosInstance.put(url, data),
    delete: (url) => axiosInstance.delete(url),
};

export default apiService;
