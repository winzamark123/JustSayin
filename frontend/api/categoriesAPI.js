import axios from 'axios';
// import { FIREBASE_AUTH } from '../firebase/config';

const BASE_URL = "http://localhost:4000";

export const saveUserCategories = async (categories) => {
    const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

    const response = await axios.post()
};

export const fetchAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/categories`);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}