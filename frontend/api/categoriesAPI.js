import axios from 'axios';
import { FIREBASE_AUTH } from '../firebase/config';

const BASE_URL = "http://localhost:4000";
const saveUserCategories = async (categories) => {
    const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

    const response = await axios.post()
};

const getAllCategories = async () => {
    const response = await axios.get(`${BASE_URL}/api/categories`);
    return response.data;
}