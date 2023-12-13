// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to update user data
    const updateUser = async (userID) => {
        const fetchedUser = await fetchUserFromBackend(userID);
        setUser(fetchedUser);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

// use this hook in components to access user data and update function
export const useUser = () => useContext(UserContext);
