import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from "react-native";
import { colorPalette, fontFamily, fontSize } from '../components/theme';
import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseConfig';


export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(''); // [username, setUsername
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const goToLogin = () => {
        navigation.navigate("LoginPage");
    }

    const goToCategory = () => {
        navigation.navigate("CategoryPage");
    }

    const handleSignUp = async () => {
        console.log("Email:", email, "Password:", password);

        try {
            const userCred = createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
                .then(userCredential => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("USER ID (UID):", user.uid);
                    goToCategory();
                    // ...
                })
                .catch(error => {
                    console.error(error);
                    // ..
                });
            console.log(userCred);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <View style={signup.background}>
            <Text style={title.text}>Create an Account</Text>

            <View style={signUpForm.container}>
                <View style={signUpForm.form}>
                    <Text style={signUpForm.form_text}>Username</Text>
                    <TextInput style={signUpForm.form_input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    ></TextInput>
                    <Text style={signUpForm.form_text}>Password</Text>
                    <TextInput style={signUpForm.form_input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    ></TextInput>
                    <Text style={signUpForm.form_text}>Email</Text>
                    <TextInput style={signUpForm.form_input}
                        value={email}
                        onChangeText={(text) => setEmail(text.trim())}
                    ></TextInput>


                    <View style={signUpForm.signUpBTN_Container}>

                        <TouchableOpacity style={signUpForm.signUpBTN} onPress={() => handleSignUp()}>
                            <Text style={signUpForm.signUpBTN_text}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={login.BTN} onPress={() => goToLogin()}>
                <Text style={login.text}>Login</Text>
            </TouchableOpacity>
        </View>


    )
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

signup = StyleSheet.create({
    background: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: colorPalette.yellowColor,
        flex: 1,
        alignItems: 'center',
    },
});

login = StyleSheet.create({
    BTN: {
        position: 'absolute',
        top: 520,
        right: 70,
        alignItems: 'center',
    },
    text: {
        position: 'relative',
        fontSize: 15,
        color: colorPalette.blackColor,
        fontFamily: fontFamily.Poppins,
        textDecorationLine: 'underline',
    },
});

title = StyleSheet.create({
    text: {
        position: 'relative',
        fontSize: 30,
        color: colorPalette.mainColor,
        fontFamily: fontFamily.Poppins,
        marginTop: 200,
    },
});

signUpForm = StyleSheet.create({
    container: {
        position: 'relative',
        width: 350,
        height: 200,

        alignItems: 'center',
    },
    form: {
        marginTop: 20,
        width: 300,
        height: 150,
    },

    form_text: {
        color: colorPalette.blackColor,
        fontFamily: fontFamily.Poppins,
        fontSize: 14,
        marginTop: 40,
    },
    form_input: {
        borderColor: 'transparent',
        borderBottomColor: colorPalette.blackColor,
        borderWidth: 1,
        width: 300,
        color: colorPalette.blackColor,
    },

    signUpBTN_Container: {
        display: 'flex',
        marginTop: 150,
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpBTN: {
        backgroundColor: colorPalette.forestGreenColor,
        borderRadius: 25,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 277,
        height: 72,

        alignItems: 'center',
        justifyContent: 'center',

    },
    signUpBTN_text: {
        color: colorPalette.blackColor,
        fontFamily: fontFamily.Average,
        fontSize: fontSize.medium,
    },

});