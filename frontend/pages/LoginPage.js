import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, Image } from "react-native";
import { colorPalette, fontFamily, normalize } from "../components/theme";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useUser } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import 'firebase/auth';
import SafeAreaWrapper from "../components/SafeAreaWrapper";



export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const { updateUser } = useUser();



    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const uid = response.user.uid;

            // console.log("User Logged In with UID:", uid);

            updateUser(uid);
            // console.log("Update Successful");
            navigation.navigate("HomePage");

        } catch (e) {
            alert(e.message);
        }
        setLoading(false);
    }


    const goToSignUp = () => {
        navigation.navigate("SignUpPage");
    }

    const goToForgotPassword = () => {
        navigation.navigate("ForgotPassword");
    }


    return (
        <SafeAreaWrapper color={colorPalette.mainColor} >
            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                < View style={login.background}>
                    <View style={login.title}>
                        <Text style={login.title_text}>Welcome to</Text>
                        <Text style={login.title_text}>We missed you!</Text>
                    </View>
                    <View style={loginForm.container}>
                        <View style={loginForm.form}>
                            <TextInput style={loginForm.form_input}
                                value={email}
                                placeholder="Email"
                                placeholderTextColor={colorPalette.yellowColor}
                                onChangeText={(text) => setEmail(text)}
                            ></TextInput>
                            <TextInput style={loginForm.form_input}
                                secureTextEntry={true}
                                value={password}
                                placeholder="Password"
                                placeholderTextColor={colorPalette.yellowColor}
                                onChangeText={(text) => setPassword(text)}
                            ></TextInput>

                            <View style={loginForm.loginBTN_Container}>

                                <TouchableOpacity style={loginForm.loginBTN} onPress={() => signIn()}>
                                    <Text style={loginForm.loginBTN_text}>Log In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={loginForm.signUpBTN} onPress={() => goToSignUp()}>
                                    <Text style={loginForm.signUpText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View >
            </View>
        </SafeAreaWrapper >
    )
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

login = StyleSheet.create({
    background: {
        // backgroundColor: colorPalette.yellowColor,
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
    },

});

forgotPassword = StyleSheet.create({
    BTN: {
        position: 'relative',
        top: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colorPalette.blackColor,
        fontFamily: fontFamily.Poppins,
        textDecorationLine: 'underline',
        fontSize: 15,
    },
});


loginForm = StyleSheet.create({
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
        // marginTop: normalize(40),
    },
    form_input: {
        borderColor: 'transparent',
        borderBottomColor: colorPalette.yellowColor,
        borderWidth: 2,
        width: normalize(280),
        color: colorPalette.yellowColor,
        fontFamily: fontFamily.Poppins,
        marginTop: normalize(40),
        // paddingBottom: 5,
    },

    loginBTN_Container: {
        display: 'flex',
        marginTop: normalize(150),
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 2,
        // borderColor: 'black',
    },
    loginBTN: {
        backgroundColor: colorPalette.forestGreenColor,
        borderRadius: 25,
        borderColor: 'transparent',
        borderWidth: 1,
        width: normalize(277),
        height: normalize(72),

        alignItems: 'center',
        justifyContent: 'center',

    },
    loginBTN_text: {
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


