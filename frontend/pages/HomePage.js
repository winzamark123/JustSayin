import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { useUser } from "../context/UserContext";
import { fetchDailySayingFromBackend, refreshDailySayingFromBackend } from "../api/dailySayingAPI";
import { saveUserSayingToBackend } from "../api/userAPI";

import { colorPalette, fontFamily } from "../components/theme";
import NavBar from "../components/navBar";
import tempUserIMG from '../assets/tempUser.png';
import SavedSayings from "../components/savedSayings";




export default function Home() {
    const { user } = useUser();
    const [dailySaying, setDailySaying] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);


    const loadDailySaying = async () => {
        try {
            const fetchedDailySaying = await fetchDailySayingFromBackend(user.firebaseID);
            setDailySaying(fetchedDailySaying);
            // console.log("Daily Saying Loaded", fetchedDailySaying)
        } catch (error) {
            console.log("Error loading daily saying", error);
        }
    }

    const refreshDaily = async () => {
        console.log("Refreshing Daily Saying: ", user.firebaseID);
        try {
            const fetchedDailySaying = await refreshDailySayingFromBackend(user.firebaseID);
            setDailySaying(fetchedDailySaying);
            // console.log("Daily Saying Loaded", fetchedDailySaying)
        } catch (error) {
            console.log("Error refreshing daily saying", error);
        }
    }

    const saveDaily = async () => {
        console.log("Saving Daily Saying: ", user.firebaseID);
        try {
            const savedDailySaying = await saveUserSayingToBackend(user.firebaseID, dailySaying.sayingID._id);
            console.log("Daily Saying Saved", savedDailySaying)
        } catch (error) {
            console.log("Error saving daily saying", error);
        }

        setRefreshKey(refreshKey + 1);
    }

    useEffect(() => {
        if (!user) {
            console.log("User is null");
            // Optionally, handle the situation when user data is not available
        }

        loadDailySaying();
    }, [user]);



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
                        <View style={dailySayingStyles.quoteBox}>
                            <Text
                                adjustsFontSizeToFit
                                numberOfLines={7}
                                style={dailySayingStyles.quote}>
                                {dailySaying.sayingID ? dailySaying.sayingID.quote : "Loading..."}
                            </Text>
                            <Text style={dailySayingStyles.author}>{dailySaying.sayingID ? dailySaying.sayingID.author : "Loading..."}</Text>
                            <Text style={dailySayingStyles.category}>{dailySaying.sayingID ? dailySaying.sayingID.category : "Loading..."}</Text>
                        </View>
                    </View>
                    {/* <Text>Home Page - UserID: {user.firebaseID}</Text> */}
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "space-between", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => refreshDaily()}>
                            <Text>REFRESH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => saveDaily()}>
                            <Text>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={savedSayings.container}>
                        <Text>SAVED SAYINGS</Text>
                        <SavedSayings refreshKey={refreshKey} />
                    </View>
                </View>
                <NavBar />
            </View>
        </SafeAreaView>
    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const savedSayings = StyleSheet.create({
    container: {
        marginTop: 20,
        // borderWidth: 1,
        // borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const dailySayingStyles = StyleSheet.create({
    quoteBox: {
        height: 233,
        width: 370,
        backgroundColor: 'red',
        borderRadius: 11,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quote: {
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        justifySelf: 'center',
        textAlign: 'center',
        color: "white",
        fontSize: 20,
        fontFamily: fontFamily.Poppins,

    },
    author: {
        alignSelf: 'flex-end',
        justifySelf: 'center',
        textAlign: 'center',
        color: "white",
        fontSize: 20,
        fontFamily: fontFamily.Poppins,
    },
    category: {
        alignSelf: 'center',
        justifySelf: 'center',
        textAlign: 'center',
        color: "white",
        fontSize: 20,
        fontFamily: fontFamily.Poppins,

    }

});

const homeMain = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colorPalette.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'flex-start',
        marginLeft: 30,
        fontSize: 24,
        fontFamily: fontFamily.Poppins,
        color: colorPalette.mainColor,
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
