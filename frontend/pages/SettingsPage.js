import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useUser } from "../context/UserContext";

import NavBar from '../components/navBar'
import { colorPalette, fontFamily, normalize } from "../components/theme";
import { launchImageLibrary } from 'react-native-image-picker';

import { saveUserProfilePicToBackend, editUsernameToBackend } from "../api/userAPI";



export default function SettingsPage({ navigation }) {
    const { user, profilePic, updateUser, updateProfilePic } = useUser();
    const [username, setUsername] = useState(user.username);
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

    const saveUsername = async () => {
        try {
            const response = await editUsernameToBackend(user.firebaseID, username);
            updateUser();
            console.log("Username Edited to Backend", response);
        } catch (error) {
            console.log("Error editing username to backend", error);
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
                    <TouchableOpacity style={settingsProfilePic.edit} onPress={editProfilePic}>
                        <Icon name="edit" size={30} color="#D33F48" />
                    </TouchableOpacity>
                </View>

                <View style={settingsCardStyles.card}>
                    <View style={settingsCardStyles.input}>
                        <Text style={settingsCardStyles.cardText}>Username</Text>
                        <TextInput style={settingsCardStyles.cardPlaceholder}
                            placeholder="Username"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        >
                        </TextInput>
                    </View>
                    <Icon name="person" size={normalize(35)} color="#D33F48" />
                </View>
                <TouchableOpacity style={settingsCardStyles.cardCategory} onPress={goToCategoryPage}>
                    <View>
                        <Text style={settingsCardStyles.cardPlaceholder}>Edit Categories</Text>
                    </View>
                    <Icon name="category" size={normalize(35)} color="#D33F48" />
                </TouchableOpacity>
                <TouchableOpacity style={saveButton.container} onPress={saveUsername}>
                    <Text style={saveButton.text}>Save</Text>
                </TouchableOpacity>
            </View>
            <NavBar />

        </SafeAreaView >
    )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const settingsCardStyles = StyleSheet.create({
    card: {
        backgroundColor: colorPalette.whiteColor,
        paddingRight: normalize(20),
        paddingLeft: normalize(20),
        paddingTop: normalize(10),
        paddingBottom: normalize(10),
        height: normalize(70),
        borderRadius: 11,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    cardCategory: {
        backgroundColor: colorPalette.whiteColor,
        paddingRight: normalize(20),
        paddingLeft: normalize(20),
        paddingTop: normalize(10),
        paddingBottom: normalize(10),
        height: normalize(70),
        borderRadius: 11,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cardText: {
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(14),
        color: "grey",
    },
    cardPlaceholder: {
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(20),
        color: "black",
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
    },
    edit: {
        position: "absolute",
        top: normalize(200),
        left: normalize(200),
        backgroundColor: colorPalette.whiteColor,
        borderRadius: normalize(20),
        width: normalize(40),
        height: normalize(40),
        justifyContent: "center",
        alignItems: "center"
    }
});

const saveButton = StyleSheet.create({
    container: {
        backgroundColor: colorPalette.forestGreenColor,
        borderRadius: 11,
        // height: normalize(50),
        // width: normalize(200),
        justifyContent: "center",
        alignItems: "center",
        marginTop: normalize(20),
        marginBottom: normalize(20),
        padding: normalize(15)
    },
    text: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: normalize(20),
        color: colorPalette.blackColor,
    }
});

