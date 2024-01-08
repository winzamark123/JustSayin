import axios from 'axios';
import { FIREBASE_AUTH } from '../firebaseConfig';
import RNFetchBlob from 'react-native-fetch-blob';

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

export const fetchUserFromBackend = async (userID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
        console.log("ID TOKEN: ", idToken);

        const response = await axios.get(`${BASE_URL}/api/users/${userID}`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        if (response.status === 200) {
            // console.log("UserAPI: User Fetched from Backend:", response.data);
        }



        return response.data;
    } catch (error) {
        console.log("UserAPI: Error Fetching User from Backend", error);
    }
}

export const saveUserSayingToBackend = async (userID, sayingID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
        console.log("ID TOKEN: ", idToken);

        const response = await axios.post(`${BASE_URL}/api/users/${userID}/savedSayings`, { sayingID }, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        console.log("UserAPI: User Saying Saved to Backend:", response.data);
        return response.data;

    } catch (error) {
        console.log("UserAPI: Error Saving User Saying to Backend", error);
    }
}

export const fetchUserSayingsFromBackend = async (userID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
        console.log("ID TOKEN: ", idToken);

        const response = await axios.get(`${BASE_URL}/api/users/${userID}/savedSayings`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        console.log("UserAPI: User Sayings Fetched from Backend:", response.data);
        return response.data;
    } catch (error) {
        console.log("UserAPI: Error Fetching User Sayings from Backend", error);
    }
}

const getBlobFromUri = async (uri) => {
    return new Promise((resolve, reject) => {
        RNFetchBlob.fs.readFile(uri, 'base64')
            .then((data) => {
                const blob = RNFetchBlob.polyfill.Blob.build(data, { type: 'image/jpeg;BASE64' });
                resolve(blob);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export const saveUserProfilePicToBackend = async (userID, profilePic) => {
    const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
    const formData = new FormData();

    const blob = await getBlobFromUri(profilePic);

    formData.append('uid', userID);
    formData.append('profilePic', blob);

    console.log("FormData: ", formData);
    try {
        const response = await axios.post(`${BASE_URL}/api/users/${userID}/profilePic`, formData, {
            headers: {
                'Authorization': `Bearer ${idToken}`, // 'Content-Type': 'multipart/form-data
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("UserAPI: User Profile Pic Saved to Backend:", response.data);
    } catch (error) {
        console.log("UserAPI: Error Saving User Profile Pic to Backend", error);
    }

}



