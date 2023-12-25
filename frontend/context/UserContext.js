// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUserFromBackend } from '../api/userAPI';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    // Function to update user data
    const updateUser = async (userID) => {
        try {
            const fetchedUser = await fetchUserFromBackend(userID);
            setUser(fetchedUser);
            console.log("UserContext: Set User Successful", fetchedUser.username);
        } catch (error) {
            console.error("UserContext: Error at fetchUser", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

// use this hook in components to access user data and update function
export const useUser = () => useContext(UserContext);
