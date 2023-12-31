import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useUser } from "../context/UserContext";

import NavBar from '../components/navBar'
import { colorPalette, fontFamily } from "../components/theme";
import tempUserIMG from '../assets/tempUser.png';


export default function SettingsPage({ navigation }) {

    const goToCategoryPage = () => {
        navigation.navigate("CategoryPage");
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
                        <Text style={settingsCardStyles.cardText}>Change Category</Text>
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


