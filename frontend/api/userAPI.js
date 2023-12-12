import axios from 'axios';
import { getUserToken } from './firebase';

const BASE_URL = "http://localhost:4000";


export const saveUserToBackend = async (user, username) => {
    try {
        const idToken = await user.getIdToken();
        console.log("ID TOKEN: ", idToken);

        const response = await axios.post(`${BASE_URL}/api/users`, { username }, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        if (response.status === 201) {
            console.log("User Saved to Backend with username:", username);
        }

        return response.data;
    } catch (error) {
        console.log("Error Saving User to Backend", error);

        if (error.response && error.response.status == 409) {
            alert("User already exists");
            // console.log("User already exists");
        }
    }
}




