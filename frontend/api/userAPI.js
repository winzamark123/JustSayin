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
        console.log("ID TOKEN: ", idToken);

        const response = await axios.post(`${BASE_URL}/api/users`, {}, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.log("Error Saving User to Backend", error);

        if (error.response) {
            // The request was made and the server responded with a status code
            console.log("Error Data:", error.response.data);
            console.log("Error Status:", error.response.status);
            console.log("Error Headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("Error Request:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error Message:", error.message);
        }
    }
}


