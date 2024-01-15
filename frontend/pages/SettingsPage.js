import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useUser } from "../context/UserContext";

import NavBar from '../components/navBar'
import { colorPalette, fontFamily, normalize } from "../components/theme";
import { launchImageLibrary } from 'react-native-image-picker';

import { saveUserProfilePicToBackend, getUserProfilePicFromBackend } from "../api/userAPI";



export default function SettingsPage({ navigation }) {
    const { user, profilePic, updateProfilePic } = useUser();
    const [curProfilePic, setProfilePic] = useState();

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
                const selectedImage = result.assets[0];
                // console.log("Result: ", result);
                // console.log("Selected Image: ", selectedImage);
                setProfilePic(selectedImage); // Assuming this is a state setter
                completeEditProfilePic(selectedImage); // Pass URI directly
            }

        } catch (error) {
            console.log("Error editing profile pic", error);
        }

    }

    const completeEditProfilePic = async (image) => {
        try {
            const response = await saveUserProfilePicToBackend(user.firebaseID, image);
            console.log("Profile Pic Saved to Backend", response);

            await updateProfilePic();
        } catch (error) {
            console.log("Error saving profile pic to backend", error);
        }
    }

    useEffect(() => {
        updateProfilePic();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: colorPalette.yellowColor }}>
            <View style={settingsStyles.container}>
                <Text style={{ fontFamily: fontFamily.PoppinsBold, fontSize: 30 }}>Settings</Text>
                <View style={settingsProfilePic.container}>
                    <Image source={profilePic} style={settingsProfilePic.pic}></Image>
                </View>
                <TouchableOpacity onPress={goToCategoryPage}>
                    <Text style={{ fontFamily: fontFamily.PoppinsBold, fontSize: 30 }}>Categories</Text>
                </TouchableOpacity>

                <TouchableOpacity style={settingsCardStyles.card} onPress={goToCategoryPage}>
                    <View>
                        <Text style={settingsCardStyles.cardText}>Edit Username</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={settingsCardStyles.card} onPress={goToCategoryPage}>
                    <View>
                        <Text style={settingsCardStyles.cardText}>Edit Category</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={settingsCardStyles.card} onPress={editProfilePic}>
                    <View>
                        <Text style={settingsCardStyles.cardText}>Edit Profile Image</Text>
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
        // height: 113,
        padding: 20,
        borderRadius: 11,
        // borderWidth: 1,
        // borderColor: 'black',
        marginBottom: 20
    },
    cardText: {
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(20),
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
        height: normalize(308),
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "black"
    },
    pic: {
        width: normalize(166),
        height: normalize(166),
        borderRadius: normalize(83),
    }
});


