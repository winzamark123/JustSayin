import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { fetchUserFromBackend } from '../api/userAPI';
// import { NavBar } from "../components/navBar";

export default function Home(props) {
    // console.log("Home Page - UserID:", userID)
    console.log("Home Page - userID:", props.route.params.userID)
    const userID = props.route.params.userID;
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await fetchUserFromBackend(userID);
                setUser(fetchedUser);
                console.log("User:", user);
            } catch (error) {
                console.error("Error at fetchUser", error);
            }
        };

        fetchUser();
    }, []);


    return (
        <View style={homeStyles.background}>
            <View style={homeStyles.container}>
                <Text>Home Page - UserID: {userID}</Text>
                <Text>{JSON.stringify(user, null, 2)}</Text>
                <Text>{user.username}</Text>
            </View>
            {/* <NavBar /> */}
        </View>
    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth,
        height: windowHeight
    },
    background: {
        flex: 1,
        backgroundColor: '#F0F0D1',
        alignItems: 'center',
        // justifyContent: 'center',
        width: windowWidth,
        height: windowHeight
    }

})
