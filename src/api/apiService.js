import axiosInstance from './axiosInstance';

const apiService = {
  get: (url, params = {}) => axiosInstance.get(url, { params }),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data) => axiosInstance.put(url, data),
  delete: url => axiosInstance.delete(url),
};

export default apiService;
