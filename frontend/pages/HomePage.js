import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, NativeModules } from "react-native";
import { useEffect, useState } from "react";

import { useUser } from "../context/UserContext";
import { fetchDailySayingFromBackend, refreshDailySayingFromBackend } from "../api/dailySayingAPI";
import { saveUserSayingToBackend, getUserProfilePicFromBackend } from "../api/userAPI";

import { colorPalette, fontFamily } from "../components/theme";
import NavBar from "../components/navBar";
import SavedSayings from "../components/savedSayings";

import Icon from 'react-native-vector-icons/MaterialIcons';




export default function Home() {
    const { user, profilePic, updateProfilePic } = useUser();
    const [dailySaying, setDailySaying] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);

    const { RNSharedWidget } = NativeModules;

    const toggleWidget = () => {
        console.log(RNSharedWidget);
        RNSharedWidget.setData('justSayinWidgetKey', JSON.stringify({
            quote: dailySaying.sayingID.quote ?? "Unknown",
            author: dailySaying.sayingID.author ?? "Author",
        }), (status) => {
            console.log('Widget status: ', status);
        });
        console.log("Widget Toggled!")
    }

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
        updateProfilePic();
        loadDailySaying();
    }, [user]);



    return (
        <SafeAreaView style={homeStyles.safeArea}>
            <View style={homeStyles.background}>
                <View style={homeStyles.container}>
                    <View style={homeTop.container}>
                        <Image source={profilePic} style={homeTop.userProfileImage}></Image>
                        <View style={homeTop.textContainer}>
                            <Text style={{ fontFamily: fontFamily.Poppins }}>Have a nice day</Text>
                            <Text style={{ fontFamily: fontFamily.PoppinsSemiBold, fontSize: 20 }}>{user.username}</Text>
                        </View>
                    </View>
                    <View style={homeMain.container}>
                        <Text style={homeMain.text}>Quote of the Day</Text>
                        <View style={dailySayingStyles.quoteBox}>
                            <Text
                                adjustsFontSizeToFit
                                numberOfLines={6}
                                style={dailySayingStyles.quote}>
                                {dailySaying.sayingID ? dailySaying.sayingID.quote : "Loading..."}
                            </Text>
                            {/* <Text style={dailySayingStyles.category}>{dailySaying.sayingID ? dailySaying.sayingID.category : "Loading..."}</Text> */}

                            <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 10 }}>

                                <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "center" }}>
                                    <TouchableOpacity onPress={() => saveDaily()}>
                                        <Icon name="favorite" size={30} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => refreshDaily()}>
                                        <Icon name="refresh" size={30} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => toggleWidget()}>
                                        <Icon name="home" size={32} color="white"></Icon>
                                    </TouchableOpacity>
                                </View>
                                <Text style={dailySayingStyles.author}>{dailySaying.sayingID ? dailySaying.sayingID.author : "Loading..."}</Text>

                            </View>


                        </View>
                    </View>
                    {/* <Text>Home Page - UserID: {user.firebaseID}</Text> */}
                    <View style={savedSayings.container}>
                        <Text style={savedSayings.text}>SAVED SAYINGS</Text>
                        <SavedSayings refreshKey={refreshKey} />
                    </View>
                </View>
            </View>
            <NavBar />
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
    text: {
        alignSelf: 'flex-start',
        fontFamily: fontFamily.PoppinsBold,
        fontSize: 22,

    }
});

const dailySayingStyles = StyleSheet.create({
    quoteBox: {
        height: 295,
        width: 370,
        backgroundColor: colorPalette.mainColor,
        borderRadius: 11,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 16.5,
        paddingRight: 16.5,
        // borderWidth: 1,
        // borderColor: 'black',
    },
    quote: {
        // borderWidth: 1,
        // borderColor: 'black',
        color: "white",
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: 20,
        marginTop: 35,
    },
    author: {
        alignSelf: 'flex-end',
        textAlign: 'center',
        color: "white",
        fontSize: 16,
        fontFamily: fontFamily.Poppins,
        maxWidth: 250,
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
        // borderWidth: 1,
        // borderColor: "black",
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 12,
    },
    text: {
        alignSelf: 'flex-start',
        fontSize: 24,
        fontFamily: fontFamily.PoppinsBold,
        color: colorPalette.mainColor,
    },
});
const homeTop = StyleSheet.create({
    textContainer: {
        marginLeft: 12,
        flexDirection: 'column',
    },
    container: {
        marginTop: 30,
        flexDirection: 'row',
        backgroundColor: '#F0F0D1',
        width: windowWidth,

        // borderWidth: 1,
        // borderColor: 'black',
    },
    text: {

    },
    userProfileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
});
const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        width: windowWidth,
        height: windowHeight,
        paddingLeft: 30,
        paddingRight: 30,
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
