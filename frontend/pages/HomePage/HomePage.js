import React from "react";

import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, NativeModules } from "react-native";
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';

import { useUser } from "../../context/UserContext";
import { fetchDailySayingFromBackend, refreshDailySayingFromBackend } from "../../api/dailySayingAPI";
import { saveUserSayingToBackend, addDeviceTokenToBackend } from "../../api/userAPI";

import { colorPalette, fontFamily, normalize } from "../../components/theme";
import NavBar from "../../components/navBar";
import SavedSayings from "./savedSayings";
import Layout from "../../components/Layout";

import Icon from 'react-native-vector-icons/MaterialIcons';





export default function Home() {
    const { user, profilePic, updateProfilePic } = useUser();
    const [dailySaying, setDailySaying] = useState({});
    const { RNSharedWidget } = NativeModules;
    const [refreshKey, setRefreshKey] = useState(0);

    async function requestUserPermission() {
        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);
        
        const authStatus = await messaging().requestPermission();
        if (authStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
            // addDeviceTokenToBackend(user.firebaseID, fcmToken);
            console.log("Permission status: ", authStatus);
        }

        console.log('Authorization status:', authStatus);

        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            console.log('User has notification permissions enabled.');
            const fcmToken = await messaging().getToken();
            // console.log('FCM Token:', fcmToken);
            const res = await addDeviceTokenToBackend(user.firebaseID, fcmToken);
            console.log("Device Token Added to Backend: ", res);

        }

    }

    const toggleWidget = () => {
        requestUserPermission();
        RNSharedWidget.setData('justSayinWidgetKey', JSON.stringify({
            quote: dailySaying.sayingID.quote ?? "Unknown",
            author: dailySaying.sayingID.author ?? "Author",
        }), (status) => {
            console.log('Widget status: ', status);
        });


        // console.log("Widget Toggled!")
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
        <Layout bgColor={colorPalette.yellowColor}>
            <View style={homeStyles.background}>
                <View style={homeStyles.container}>
                    <View style={homeTop.container}>
                        <Image source={profilePic} style={homeTop.userProfileImage}></Image>
                        <View style={homeTop.textContainer}>
                            <Text style={{ fontFamily: fontFamily.Poppins }}>Have a nice day</Text>
                            <Text style={{ fontFamily: fontFamily.PoppinsSemiBold, fontSize: normalize(20) }}>{user.username}</Text>
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

                            <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 10 }}>

                                <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-start" }}>
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
                    <View style={savedSayings.container}>
                        <Text style={savedSayings.text}>SAVED SAYINGS</Text>
                        <SavedSayings refreshKey={refreshKey} />
                    </View>
                </View>
            </View>
        </Layout>
    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const savedSayings = StyleSheet.create({
    container: {
        marginTop: normalize(20),
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
        height: normalize(295),
        width: "100%",
        backgroundColor: colorPalette.mainColor,
        borderRadius: 11,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: normalize(16.5),
        paddingRight: normalize(16.5),
        // borderWidth: 1,
        // borderColor: 'black',
    },
    quote: {
        // borderWidth: 1,
        // borderColor: 'black',
        color: "white",
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: normalize(20),
        marginTop: normalize(35),
        // borderWidth: 1,
        // borderColor: "white",
    },
    author: {
        alignSelf: 'flex-end',
        textAlign: 'center',
        color: "white",
        fontSize: normalize(16),
        fontFamily: fontFamily.Poppins,
        maxWidth: normalize(210),
    },

});

const homeMain = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: "black",
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: normalize(12),
        marginBottom: normalize(12),
    },
    text: {
        alignSelf: 'flex-start',
        fontSize: normalize(24),
        fontFamily: fontFamily.PoppinsBold,
        color: colorPalette.mainColor,
    },
});
const homeTop = StyleSheet.create({
    textContainer: {
        marginLeft: normalize(12),
        flexDirection: 'column',
    },
    container: {
        marginTop: normalize(30),
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
        paddingLeft: normalize(30),
        paddingRight: normalize(30),
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
