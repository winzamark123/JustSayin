import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";

const auth = getAuth();

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};

export const getUserToken = async () => {
    const user = auth.currentUser;
    if (user) {
        return await user.getIdToken();
    }
    return null;
};
