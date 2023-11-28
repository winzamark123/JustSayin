import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from "react-native";
import { colorPalette, fontFamily, fontSize } from "../components/theme";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import 'firebase/auth';



export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const [userToken, setUserToken] = useState("");

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);

            const TempToken = await response.user.getIdToken();

            setUserToken(TempToken);
            console.log("User Token ID", userToken);
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
        < View style={login.background} >

            <Text style={title.welcome}>Welcome Back</Text>
            <Text style={title.welcome2}>We missed you!</Text>


            <View style={loginForm.container}>
                <View style={loginForm.form}>
                    <Text style={loginForm.form_text}>Email</Text>
                    <TextInput style={loginForm.form_input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    ></TextInput>
                    <Text style={loginForm.form_text}>Password</Text>
                    <TextInput style={loginForm.form_input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    ></TextInput>

                    <View style={loginForm.loginBTN_Container}>

                        <TouchableOpacity style={loginForm.loginBTN} onPress={() => signIn()}>
                            <Text style={loginForm.loginBTN_text}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={signUp.BTN} onPress={() => goToSignUp()}>
                <Text style={signUp.text}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={forgotPassword.BTN} onPress={() => goToForgotPassword()}>
                <Text style={forgotPassword.text}>Forgot Password?</Text>
            </TouchableOpacity>


        </View >
    )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

login = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colorPalette.yellowColor,
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});

title = StyleSheet.create({
    welcome: {
        position: 'relative',
        marginTop: 200,
        left: 30,
        width: 300,
        fontSize: 30,
        color: colorPalette.mainColor,
    },
    welcome2: {
        position: 'relative',
        left: 30,
        width: 300,
        fontSize: 30,
        color: colorPalette.mainColor,
    },
});


signUp = StyleSheet.create({
    BTN: {
        position: 'absolute',
        top: 480,
        right: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colorPalette.blackColor,
        fontFamily: fontFamily.Poppins,
        fontSize: 15,
        textDecorationLine: 'underline',
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
        // borderColor: 'blue',
        // borderWidth: 2,
        width: 350,
        height: 200,

        alignItems: 'center',
        // justifyContent: 'center',
    },
    form: {
        // borderColor: 'red',
        // borderWidth: 2,
        marginTop: 20,
        width: 300,
        height: 150,
    },

    form_text: {
        color: colorPalette.blackColor,
        fontFamily: fontFamily.Poppins,
        fontSize: 14,
        // paddingTop: 5,
        // paddingBottom: 5,
        marginTop: 40,
    },
    form_input: {
        borderColor: 'transparent',
        borderBottomColor: colorPalette.blackColor,
        borderWidth: 1,
        width: 300,
        color: colorPalette.blackColor,
        // paddingBottom: 5,
    },

    loginBTN_Container: {
        display: 'flex',
        marginTop: 150,
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBTN: {
        backgroundColor: colorPalette.forestGreenColor,
        borderRadius: 25,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 277,
        height: 72,

        alignItems: 'center',
        justifyContent: 'center',

    },
    loginBTN_text: {
        color: colorPalette.blackColor,
        fontFamily: fontFamily.Average,
        fontSize: fontSize.medium,
    },

});

