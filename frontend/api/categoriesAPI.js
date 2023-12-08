import axios from 'axios';
import { FIREBASE_AUTH } from '../firebaseConfig';

const BASE_URL = "http://localhost:4000";

export const saveUserCategories = async (userID, categories) => {

    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
        const response = await axios.post(`${BASE_URL}/api/users/${userID}/categories`, { categories }, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });
        console.log("Categories saved:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error at saveUserCategories", error);
        console.log(error.response.data.message);
        return error.response.data.message;
    }

};

export const fetchAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/categories`);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}