import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useUser } from "../context/UserContext";

import NavBar from '../components/navBar'
import { colorPalette, fontFamily } from "../components/theme";
import tempUserIMG from '../assets/tempUser.png';
import { launchImageLibrary } from 'react-native-image-picker';

import { saveUserProfilePicToBackend } from "../api/userAPI";



export default function SettingsPage({ navigation }) {
    const { user } = useUser();
    const [profilePic, setProfilePic] = useState();
    const [caption, setCaption] = useState("");

    const goToCategoryPage = () => {
        navigation.navigate("CategoryPage");
    }

    const editProfilePic = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        try {
            const result = await launchImageLibrary(options);
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.errorCode) {
                console.log('ImagePicker Error: ', result.errorMessage);
            } else {
                const selectedImageUri = result.assets[0].uri;
                setProfilePic(selectedImageUri); // Assuming this is a state setter
                completeEditProfilePic(selectedImageUri); // Pass URI directly
            }

        } catch (error) {
            console.log("Error editing profile pic", error);
        }

    }

    const completeEditProfilePic = async (imageUri) => {
        try {
            const response = await saveUserProfilePicToBackend(user.firebaseID, imageUri);
            console.log("Profile Pic Saved to Backend", response);
        } catch (error) {
            console.log("Error saving profile pic to backend", error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: colorPalette.yellowColor }}>
            <View style={settingsStyles.container}>
                <Text style={{ fontFamily: fontFamily.PoppinsBold, fontSize: 30 }}>Settings</Text>
                <View style={settingsProfilePic.container}>
                    <Image source={tempUserIMG} style={settingsProfilePic.pic}></Image>
                </View>
                <TouchableOpacity onPress={goToCategoryPage}>
                    <Text style={{ fontFamily: fontFamily.PoppinsBold, fontSize: 30 }}>Categories</Text>
                </TouchableOpacity>
                <View style={settingsCardStyles.card}>

                </View>
                <TouchableOpacity style={settingsCardStyles.card} onPress={goToCategoryPage}>
                    <View>
                        <Text style={settingsCardStyles.cardText}>Username</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={settingsCardStyles.card} onPress={goToCategoryPage}>
                    <View>
                        <Text style={settingsCardStyles.cardText}>Change Category</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={settingsCardStyles.card} onPress={editProfilePic}>
                    <View>
                        <Text style={settingsCardStyles.cardText}>Test ImagePicker</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <NavBar />

        </SafeAreaView>
    )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const settingsCardStyles = StyleSheet.create({
    card: {
        // flex: 1,
        backgroundColor: colorPalette.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 372,
        // height: 113,
        padding: 20,
        borderRadius: 11,
        // borderWidth: 1,
        // borderColor: 'black',
        marginBottom: 20
    },
    cardText: {
        fontFamily: fontFamily.Poppins,
        fontSize: 20,
        color: colorPalette.blackColor,
        textAlign: 'center',
    }
});

const settingsStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 35,
        paddingLeft: 30,
        paddingRight: 30
    }
});

const settingsProfilePic = StyleSheet.create({
    container: {
        height: 308,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black"
    },
    pic: {
        width: 166,
        height: 166,
        borderRadius: 83,
    }
});


