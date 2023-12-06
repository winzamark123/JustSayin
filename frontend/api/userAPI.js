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

export const saveUserToBackend = async (user) => {
    try {
        const idToken = await user.getIdToken();

        const response = await axios.post(`${BASE_URL}/api/users`, {}, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.log("Error Saving User to Backend");
        console.error(error);
    }
}


