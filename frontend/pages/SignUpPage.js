import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from "react-native";
import { colorPalette, fontFamily, normalize } from '../components/theme';
import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { saveUserToBackend } from '../api/userAPI';
import { useUser } from '../context/UserContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';


export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(''); // [username, setUsername
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { updateUser } = useUser();

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

            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            }
        }

    };

    const handleCompleteSignUp = async () => {
        const fixedUsername = username.trim(); //remove spaces from username
        console.log("Email:", email, "Password:", password, "Username:", fixedUsername);

        try {
            const user = await handleSignUp(email, password);
            const uid = user.uid;
            const response = await saveUserToBackend(user, fixedUsername);

            updateUser(uid);
            console.log("HandleCompleteSignUp:", response);

            //navigates to the CategoryPage of the User
            navigation.navigate("CategoryPage");

        } catch (error) {
            console.error("Error at handleCompleteSignUp", error);
        }
    }

    return (
        <SafeAreaWrapper color={colorPalette.mainColor} >
            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                < View style={signup.background}>
                    <View style={signup.title}>
                        <Text style={signup.title_text}>Welcome</Text>
                        <Text style={signup.title_text}>Create an Account</Text>
                    </View>
                    <View style={signupForm.container}>
                        <View style={signupForm.form}>
                            <TextInput style={signupForm.form_input}
                                placeholder='Email'
                                placeholderTextColor={colorPalette.yellowColor}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            ></TextInput>
                            <TextInput style={signupForm.form_input}
                                placeholder='Username'
                                placeholderTextColor={colorPalette.yellowColor}
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                            ></TextInput>
                            <TextInput style={signupForm.form_input}
                                placeholder='Password'
                                placeholderTextColor={colorPalette.yellowColor}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            ></TextInput>

                            <View style={signupForm.signupBTN_Container}>

                                <TouchableOpacity style={signupForm.signupBTN} onPress={() => handleCompleteSignUp()}>
                                    <Text style={signupForm.signupBTN_text}>Sign Up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={signupForm.signUpBTN} onPress={() => goToLogin()}>
                                    <Text style={signupForm.signUpText}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <TouchableOpacity style={forgotPassword.BTN} onPress={() => goToForgotPassword()}>
                        <Text style={forgotPassword.text}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View >
            </View>
        </SafeAreaWrapper>

    )
};



signup = StyleSheet.create({
    background: {
        backgroundColor: colorPalette.mainColor,
        alignItems: 'center',
        top: normalize(90),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 30,
        // borderWidth: 2,
        // borderColor: 'black',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalize(50),
        // borderWidth: 2,
        // borderColor: 'black',
    },
    title_text: {
        fontFamily: fontFamily.PoppinsBold,
        color: colorPalette.yellowColor,
        fontSize: normalize(25),
    }

});


signupForm = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    form: {
        // borderColor: 'red',
        // borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form_text: {
        color: colorPalette.blackColor,
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(14),
        // paddingTop: 5,
        // paddingBottom: 5,
        marginTop: normalize(40),
        alignSelf: 'flex-start',
    },
    form_input: {
        borderColor: 'transparent',
        borderBottomColor: colorPalette.yellowColor,
        borderWidth: 2,
        width: normalize(280),
        color: colorPalette.yellowColor,
        fontFamily: fontFamily.Poppins,
        paddingBottom: normalize(5),
        marginTop: normalize(40),
    },

    signupBTN_Container: {
        display: 'flex',
        marginTop: normalize(80),
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 2,
        // borderColor: 'black',
    },
    signupBTN: {
        backgroundColor: colorPalette.forestGreenColor,
        borderRadius: 25,
        borderColor: 'transparent',
        borderWidth: 1,
        width: normalize(277),
        height: normalize(72),

        alignItems: 'center',
        justifyContent: 'center',

    },
    signupBTN_text: {
        color: colorPalette.blackColor,
        fontFamily: fontFamily.PoppinsBold,
        fontSize: normalize(20),
    },
    signUpBTN: {
        marginTop: normalize(10),
    },
    signUpText: {
        color: colorPalette.yellowColor,
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(15),
        textDecorationLine: 'underline',
    }


});


