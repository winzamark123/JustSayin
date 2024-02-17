import axios from 'axios';
import { FIREBASE_AUTH } from '../firebaseConfig';

const BASE_URL = "http://justsayin-production.up.railway.app";
// const BASE_URL = "http://localhost:4000";

export const fetchDailySayingFromBackend = async (userID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
        console.log("ID TOKEN FROM FETCH: ", idToken);

        const response = await axios.get(`${BASE_URL}/api/dailySayings/${userID}`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });
        // console.log("THIS IS RESPONSE", response.data);

        return response.data;
    } catch (error) {
        console.log("Error Fetching Daily Saying from Backend", error);
    }
}

export const refreshDailySayingFromBackend = async (userID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
        // console.log("ID TOKEN FROM REFRESHING: ", idToken);

        const response = await axios.get(`${BASE_URL}/api/dailySayings/${userID}/generate`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });
        // console.log("THIS IS RESPONSE", response.data);

        return response.data;
    } catch (error) {
        console.log("Error Refreshing Daily Saying from Backend", error);
    }
}