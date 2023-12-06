import axios from 'axios';
import { getUserToken } from './firebase';

const BASE_URL = "http://localhost:4000";

export const setAuthToken = async () => {
    const token = await getUserToken();
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const createUser = async (userData) => {
    const response = await axios.post(`${BASE_URL}/api/users`, userData);
    return response.data;
}

export default api;
