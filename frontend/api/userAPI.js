import axios from 'axios';
import { FIREBASE_AUTH } from '../firebaseConfig';


const BASE_URL = "http://justsayin-production.up.railway.app";
// const BASE_URL = "http://localhost:4000";


export const saveUserToBackend = async (user, username) => {
    try {
        const idToken = await user.getIdToken();
        // console.log("ID TOKEN: ", idToken);

        const response = await axios.post(`${BASE_URL}/api/users`, { username }, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        if (response.status === 201) {
            // console.log("User Saved to Backend with username:", username);
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
        // console.log("ID TOKEN: ", idToken);

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
        // console.log("ID TOKEN: ", idToken);

        const response = await axios.post(`${BASE_URL}/api/users/${userID}/savedSayings`, { sayingID }, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        // console.log("UserAPI: User Saying Saved to Backend:", response.data);
        return response.data;

    } catch (error) {
        console.log("UserAPI: Error Saving User Saying to Backend", error);
    }
}

export const fetchUserSayingsFromBackend = async (userID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
        // console.log("ID TOKEN: ", idToken);

        const response = await axios.get(`${BASE_URL}/api/users/${userID}/savedSayings`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        // console.log("UserAPI: User Sayings Fetched from Backend:", response.data);
        return response.data;
    } catch (error) {
        console.log("UserAPI: Error Fetching User Sayings from Backend", error);
    }
}

export const editUsernameToBackend = async (userID, username) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
        const response = await axios.patch(`${BASE_URL}/api/users/${userID}/username`, { username }, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });
        // console.log("UserAPI: Username Edited to Backend:", response.data);

    } catch (error) {
        console.log("UserAPI: Error Editing Username to Backend", error);
    }
}

export const saveUserProfilePicToBackend = async (userID, profilePic) => {
    const idToken = await FIREBASE_AUTH.currentUser.getIdToken();
    const formData = new FormData();
    try {
        formData.append('uid', userID);
        formData.append('profilePic', {
            name: profilePic.fileName,
            type: profilePic.type,
            uri: profilePic.uri.replace('file://', '')
        });

    } catch (error) {
        console.log("Error Making Form Data", error);
    }

    try {
        const response = await axios.post(`${BASE_URL}/api/users/${userID}/profilePic`, formData, {
            headers: {
                'Authorization': `Bearer ${idToken}` // 'Content-Type': 'multipart/form-data
                // 'Content-Type': 'multipart/form-data'
            }
        });
        // console.log("UserAPI: User Profile Pic Saved to Backend:", response.data);
    } catch (error) {
        console.log("UserAPI: Error Saving User Profile Pic to Backend", error.message, error.response);
    }

}

export const getUserProfilePicFromBackend = async (userID) => {
    try {
        // const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

        const response = await axios.get(`${BASE_URL}/api/users/${userID}/profilePic`, {

        });

        // console.log("UserAPI: User Profile Pic Fetched from Backend:", response.data);
        return response.data;
    } catch (error) {
        console.log("UserAPI: Error Fetching User Profile Pic from Backend", error);
    }
}

export const addFriendToBackend = async (userID, friendUsername) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

        const response = await axios.post(`${BASE_URL}/api/users/${userID}/friends`, { friendUsername }, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        // console.log("UserAPI: Friend Added to Backend:", response.data);
        return response.data;
    } catch (error) {
        if (error.response.status === 409) {
            console.log("Friend already added!");
            return { status: 409, message: 'Friend already added' };
        }
        console.log("UserAPI: Error Adding Friend to Backend", error);
    }
}

export const deleteFriendFromBackend = async (userID, friendUsername) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

        const response = await axios.delete(`${BASE_URL}/api/users/${userID}/friends/${friendUsername}`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            },
            data: {
                friendUsername
            }
        });

        // console.log("UserAPI: Friend Deleted from Backend:", response.data);
        return response.data;
    } catch (error) {
        console.log("UserAPI: Error Deleting Friend from Backend", error);
    }
}

export const fetchFriendsDailySayingFromBackend = async (userID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

        const response = await axios.get(`${BASE_URL}/api/users/${userID}/friends/dailySaying`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        // console.log("UserAPI: Friends Daily Saying Fetched from Backend:", response.data);
        return response.data;
    } catch (error) {
        console.log("UserAPI: Error Fetching Friends Daily Saying from Backend", error);
    }
}

export const deleteUserFromBackend = async (userID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

        const response = await axios.delete(`${BASE_URL}/api/users/${userID}`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        console.log("UserAPI: User Deleted from Backend:", response.data);
        return response.data;
    } catch (error) {
        console.log("UserAPI: Error Deleting User from Backend", error);
    }
}

export const fetchFriendsFromBackend = async (userID) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

        const response = await axios.get(`${BASE_URL}/api/users/${userID}/friends`, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        // console.log("UserAPI: Friends Fetched from Backend:", response.data);
        return response.data;
    } catch (error) {
        console.log("UserAPI: Error Fetching Friends from Backend", error);
    }
}

export const addDeviceTokenToBackend = async (userID, deviceToken) => {
    try {
        const idToken = await FIREBASE_AUTH.currentUser.getIdToken();

        const response = await axios.post(`${BASE_URL}/api/users/${userID}/deviceTokens`, {
            deviceToken
        }, {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });
        return response.data;

    } catch (error) {
        console.log("UserAPI: Error Adding Device Token to Backend", error);
    }
}


