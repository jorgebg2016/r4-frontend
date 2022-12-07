import axios, { AxiosInstance } from 'axios';
const baseAPIUrl = import.meta.env.VITE_API_BASE_URL + '/api/';

const apiClient: AxiosInstance = axios.create({
    baseURL: baseAPIUrl,
    headers: {
        'Content-type': 'application/json',
    },
});

export default apiClient;