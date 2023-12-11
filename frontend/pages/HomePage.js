import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import { NavBar } from "../components/navBar";

export default function Home(props) {
    // console.log("Home Page - UserID:", userID)
    console.log("Home Page - Props:", props.route.params.userID)
    const userID = props.route.params.userID;


    return (
        <View style={homeStyles.container}>
            <Text>Home Page - UserID: {userID}</Text>

            {/* <NavBar /> */}
        </View>
    )
}

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
