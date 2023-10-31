import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { colorPalette, fontFamily, fontSize } from '../components/theme';

export default function SignUp() {
    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            Alert('Check Your Email!');
        } catch (e) {
            alert(e.message);
        }
        setLoading(false);
    }

    return (
        <View style={signUpMain.container}>
            <View style={QUOTE}>

            </View>
            <View style={signUpForm.container}>
                <Text style={signUpForm.title}> Create an Account </Text>
                <View style={signUpForm.form}></View>
            </View>
            <Text> This is SignUp Page</Text>
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const signUpMain = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
        backgroundColor: "#BBE3FF",
    }


})

const QUOTE = StyleSheet.create({

})

const signUpForm = StyleSheet.create({
    container: {
        flex: 1,

        width: windowWidth,
        height: windowHeight - 100,
        backgroundColor: "#BBBBBB",
    },

    title: {
        color: "#FFF",
        // font-family: "Crimson Pro",
        fontFamily: fontFamily.CrimsonProBold,
        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "800",

    },
    form: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        // border: '2px solid black',
        justifyContent: "center",
        alignItems: "center",
        width: '300px',
        height: '100px'
    },
    input_form: {

    }

})
