import axios from 'axios';
import { getUserToken } from './firebase';

const api = axios.create({
    baseURL: 'YOUR_BACKEND_BASE_URL',  // for example: 'http://localhost:5000'
});

export const setAuthToken = async () => {
    const token = await getUserToken();
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;
