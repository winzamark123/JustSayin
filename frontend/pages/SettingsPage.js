import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useUser } from "../context/UserContext";

import NavBar from '../components/navBar'
import { colorPalette, fontFamily, normalize } from "../components/theme";
import { launchImageLibrary } from 'react-native-image-picker';

import { saveUserProfilePicToBackend, editUsernameToBackend, deleteUserFromBackend } from "../api/userAPI";
import { getAuth, deleteUser, signOut } from "firebase/auth";

import Layout from "../components/Layout";


export default function SettingsPage({ navigation }) {
    const { user, profilePic, updateUser, updateProfilePic } = useUser();
    const [username, setUsername] = useState(user.username);
    const [curProfilePic, setProfilePic] = useState();

    const goToCategoryPage = () => {
        navigation.navigate("CategoryPage");
    }

    const handleEditProfilePic = async () => {
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

    const handleDeleteUser = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        try {
            await deleteUserFromBackend(user.uid);
        } catch (error) {
            console.error("Error deleting user from backend", error);
        }

        deleteUser(user).then(() => {
            // User deleted successfully
            // You can navigate the user to a login or welcome screen
            // and maybe clear any user-related data from your app's state or storage
            // console.log('User account deleted successfully');
            navigation.navigate("LoginPage"); // or any other screen you want to redirect to
        }).catch((error) => {
            // An error happened
            console.error('Error deleting user:', error);
            alert('Error deleting user:', error.message);
        });
    };

    const handleLogout = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        try {
            await signOut(auth);
            navigation.navigate("LoginPage");
        } catch (error) {
            console.error("Error logging out user", error);
        }
    }

    useEffect(() => {
        updateProfilePic();
    }, []);

    return (
        <Layout bgColor={colorPalette.blackColor}>
            <View style={{ flex: 1, paddingLeft: normalize(30), paddingRight: normalize(30) }}>
                <Text style={{ fontFamily: fontFamily.PoppinsBold, fontSize: normalize(28), color: "white" }}>Settings</Text>

                <View style={settingsProfilePic.container}>
                    <Image source={profilePic} style={settingsProfilePic.pic}></Image>
                    <Text style={{ fontFamily: fontFamily.PoppinsSemiBold, marginTop: normalize(5), fontSize: normalize(20), color: "white" }}>{username}</Text>
                </View>

                <View>
                    <Text style={{ ...textStyles.normal, marginTop: normalize(10), marginBottom: normalize(5) }}>General</Text>
                    <View>
                        <TouchableOpacity style={settingsCardStyles.cardTop} onPress={handleEditProfilePic}>
                            <View style={{ flexDirection: "row", gap: normalize(10), justifyContent: "center", alignItems: "center" }}>
                                <Icon name="person" size={normalize(24)} color="white" />
                                <Text style={textStyles.normal}>Edit Profile Picture</Text>
                            </View>
                            <Icon name="keyboard-arrow-right" size={normalize(35)} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={settingsCardStyles.card} onPress={handleEditProfilePic}>
                            <View style={{ flexDirection: "row", gap: normalize(10), justifyContent: "center", alignItems: "center" }}>
                                <Icon name="edit" size={normalize(24)} color="white" />
                                <Text style={textStyles.normal}>Edit Username</Text>
                            </View>
                            <Icon name="keyboard-arrow-right" size={normalize(35)} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={settingsCardStyles.cardBottom} onPress={goToCategoryPage}>
                            <View style={{ flexDirection: "row", gap: normalize(10), justifyContent: "center", alignItems: "center" }}>
                                <Icon name="money" size={normalize(24)} color="white" />
                                <Text style={textStyles.normal}>Edit Categories</Text>
                            </View>
                            <Icon name="keyboard-arrow-right" size={normalize(35)} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View >
                    <Text style={{ ...textStyles.normal, marginTop: normalize(10), marginBottom: normalize(5) }}>Friends</Text>
                    <View>
                        <TouchableOpacity style={settingsCardStyles.cardSolo} onPress={goToCategoryPage}>
                            <View style={{ flexDirection: "row", gap: normalize(10), justifyContent: "center", alignItems: "center" }}>
                                <Icon name="group" size={normalize(24)} color="white" />
                                <Text style={textStyles.normal}>Friends</Text>
                            </View>
                            <Icon name="keyboard-arrow-right" size={normalize(35)} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View >
                    <Text style={{ ...textStyles.normal, marginTop: normalize(10), marginBottom: normalize(5) }}>Account</Text>
                    <View>
                        <TouchableOpacity style={settingsCardStyles.cardTop} onPress={handleLogout}>
                            <View style={{ flexDirection: "row", gap: normalize(10), justifyContent: "center", alignItems: "center" }}>
                                <Icon name="logout" size={normalize(24)} color="white" />
                                <Text style={textStyles.normal}>Signout</Text>
                            </View>
                            <Icon name="keyboard-arrow-right" size={normalize(35)} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={settingsCardStyles.cardBottom} onPress={handleDeleteUser}>
                            <View style={{ flexDirection: "row", gap: normalize(10), justifyContent: "center", alignItems: "center" }}>
                                <Icon name="delete" size={normalize(24)} color="white" />
                                <Text style={textStyles.normal}>Delete Account</Text>
                            </View>
                            <Icon name="keyboard-arrow-right" size={normalize(35)} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Layout>

    )
}

const textStyles = StyleSheet.create({
    normal: {
        color: "white",
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: normalize(15),
        lineHeight: normalize(20),
    }
});
const settingsCardStyles = StyleSheet.create({
    card: {
        backgroundColor: colorPalette.greyColor,
        paddingRight: normalize(20),
        paddingLeft: normalize(20),
        paddingTop: normalize(5),
        paddingBottom: normalize(5),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTop: {
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        backgroundColor: colorPalette.greyColor,
        paddingRight: normalize(20),
        paddingLeft: normalize(20),
        paddingTop: normalize(20),
        paddingBottom: normalize(5),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardBottom: {
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
        backgroundColor: colorPalette.greyColor,
        paddingRight: normalize(20),
        paddingLeft: normalize(20),
        paddingTop: normalize(5),
        paddingBottom: normalize(20),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardSolo: {
        borderRadius: 11,
        backgroundColor: colorPalette.greyColor,
        paddingRight: normalize(20),
        paddingLeft: normalize(20),
        paddingTop: normalize(10),
        paddingBottom: normalize(10),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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


const settingsProfilePic = StyleSheet.create({
    container: {
        // height: normalize(200),
        padding: normalize(20),
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "black"
    },
    pic: {
        width: normalize(111),
        height: normalize(111),
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

