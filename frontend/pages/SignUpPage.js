import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from "react-native";
import { colorPalette, fontFamily, fontSize } from '../components/theme';
import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { saveUserToBackend } from '../api/userAPI';


export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(''); // [username, setUsername
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const goToLogin = () => {
        navigation.navigate("LoginPage");
    }

    const handleSignUp = async (email, password) => {

        try {
            const userCred = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log("UserCred:", userCred);
            const user = userCred.user;
            return user;

        } catch (error) {
            console.log("Error at handleSignUp", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log("Error Data:", error.response.data);
                console.log("Error Status:", error.response.status);
                console.log("Error Headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log("Error Request:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error Message:", error.message);
            }
        }

    };

    const handleCompleteSignUp = async () => {
        console.log("Email:", email, "Password:", password);
        try {
            const user = await handleSignUp(email, password);
            const uid = user.uid;
            const response = await saveUserToBackend(user);
            console.log("HandleCompleteSignUp:", response);

            //navigates to the CategoryPage of the User
            navigation.navigate("CategoryPage", { userID: uid });

        } catch (error) {
            console.log("Error at handleCompleteSignUp");
            console.error("SignUp Failed:", error);
        }
    }

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

                        <TouchableOpacity style={signUpForm.signUpBTN} onPress={() => handleCompleteSignUp()}>
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