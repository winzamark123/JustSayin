// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUserFromBackend, getUserProfilePicFromBackend } from '../api/userAPI';
import tempUserIMG from '../assets/tempUser.png';
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [profilePic, setProfilePic] = useState(tempUserIMG);

    // Function to update user data
    const updateUser = async (userID) => {
        try {
            const fetchedUser = await fetchUserFromBackend(userID);

            setUser(fetchedUser);
            // console.log("UserContext: Set User Successful", fetchedUser);
        } catch (error) {
            console.error("UserContext: Error at fetchUser", error);
        }
    };

    const updateProfilePic = async () => {
        try {
            const fetchedProfilePic = await getUserProfilePicFromBackend(user.firebaseID);
            setProfilePic(fetchedProfilePic);
            // console.log("UserContext: Set Profile Pic Successful", fetchedProfilePic);
        } catch (error) {
            console.error("UserContext: Error at fetchProfilePic", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, profilePic, updateProfilePic }}>
            {children}
        </UserContext.Provider>
    );
};

// use this hook in components to access user data and update function
export const useUser = () => useContext(UserContext);
