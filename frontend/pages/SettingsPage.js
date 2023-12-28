import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useUser } from "../context/UserContext";

import NavBar from '../components/navBar'
import { colorPalette, fontFamily } from "../components/theme";
import tempUserIMG from '../assets/tempUser.png';

export default function SettingsPage() {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: colorPalette.yellowColor }}>
            <View style={settingsStyles.container}>
                <Text style={{ fontFamily: fontFamily.PoppinsBold, fontSize: 30 }}>Settings</Text>
                <View style={settingsProfilePic.container}>
                    <Image source={tempUserIMG} style={settingsProfilePic.pic}></Image>
                </View>
            </View>
            <NavBar />

        </SafeAreaView>
    )
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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


