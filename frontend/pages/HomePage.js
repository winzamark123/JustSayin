import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { useEffect, useState } from "react";
import { fetchUserFromBackend } from '../api/userAPI';
import tempUserIMG from '../assets/tempUser.png';
import { colorPalette } from "../components/theme";
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
        <SafeAreaView style={homeStyles.safeArea}>
            <View style={homeStyles.background}>
                <View style={homeStyles.container}>
                    <View style={homeTop.container}>
                        <Image source={tempUserIMG} style={homeTop.userProfileImage}></Image>
                        <View style={homeTop.text}>
                            <Text>Have a nice day</Text>
                            <Text>{user.username}</Text>
                        </View>
                    </View>
                    <View style={homeMain.container}>
                        <Text style={homeMain.text}>Quote of the Day</Text>
                        <View style={homeMain.quoteBox}>

                        </View>
                    </View>
                    <Text>Home Page - UserID: {userID}</Text>
                    <View style={savedQuotes.container}></View>
                    {/* <Text>{JSON.stringify(user, null, 2)}</Text> */}
                    {/* <Text>{user.username}</Text> */}
                </View>
                {/* <NavBar /> */}
            </View>
        </SafeAreaView>
    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const savedQuotes = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
const homeMain = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colorPalette.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quoteBox: {
        height: 233,
        width: 370,
        backgroundColor: 'red',
        borderRadius: 11,

    },
    text: {
        alignSelf: 'flex-start',
    },
});
const homeTop = StyleSheet.create({
    text: {
        flexDirection: 'column',
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#F0F0D1',
        width: windowWidth,

        borderWidth: 1,
        borderColor: 'black',
    },
    userProfileImage: {
        width: 50,
        height: 50,
    }
});
const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
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
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F0D1',
    }

})
