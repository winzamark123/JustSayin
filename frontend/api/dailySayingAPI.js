import axios from 'axios';
import { FIREBASE_AUTH } from '../firebaseConfig';

const BASE_URL = "http://localhost:4000";

export const fetchDailySayingFromBackend = async (userID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
        console.log("ID TOKEN: ", idToken);

        const response = await axios.get(`${BASE_URL}/api/dailySayings/${userID}`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        if (response.status === 200) {
            console.log("Daily Saying Fetched from Backend");
        }

        return response.data;
    } catch (error) {
        console.log("Error Fetching Daily Saying from Backend", error);
    }
}