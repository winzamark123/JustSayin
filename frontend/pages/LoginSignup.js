import { StyleSheet, Text, TextInput, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { colorPalette, fontFamily, fontSize } from "../components/theme";
import Logo from "../components/Logo";

import JPNG from "../assets/LoginSignupPage/J.png";
import QuoteBackPNG from "../assets/LoginSignupPage/QuotationBack.png";
import QuoteFrontPNG from "../assets/LoginSignupPage/QuotationFront.png";
import SayingPNG from "../assets/LoginSignupPage/Sayin.png";
import ustPNG from "../assets/LoginSignupPage/ust.png";


export default function LoginSignup() {

    return (
        < View style={styles.main_container} >
            <View style={title.container}>
                {/* <Logo logoSize={100} /> */}
                <Image style={title.quoteFront} source={QuoteFrontPNG} />
                <View style={title.text}>
                    <View style={title.text_just}>
                        <Image style={styles.J} source={JPNG} />
                        <Text style={title.text_ust}>ust</Text>
                    </View>

                    <View style={title.text_sayContainer}>
                        <Text style={title.text_saying}>Sayin</Text>
                    </View>
                </View>
                <Image style={title.quoteBack} source={QuoteBackPNG}></Image>
            </View>

            <View style={loginForm.container}>
                <Text style={loginForm.LoginText}>Log In</Text>
                <View style={loginForm.form}>
                    <Text style={loginForm.form_text}>Email</Text>
                    <TextInput style={loginForm.form_input}></TextInput>
                    <Text style={loginForm.form_text}>Password</Text>
                    <TextInput style={loginForm.form_input}></TextInput>
                    <View style={loginForm.loginBTN_Container}>

                        <TouchableOpacity style={loginForm.loginBTN} onPress={() => console.log("LoginBTN Pressed")}>
                            <Text style={loginForm.loginBTN_text}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </View >
    )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

loginForm = StyleSheet.create({
    container: {
        marginTop: 70,
        // borderColor: 'blue',
        // borderWidth: 2,
        width: 350,
        height: 200,

        alignItems: 'center',
        // justifyContent: 'center',
    },
    LoginText: {
        color: colorPalette.secondaryColor,
        fontSize: fontSize.large,
        fontFamily: fontFamily.AveriaSerifLibre,
    },
    form: {
        // borderColor: 'red',
        // borderWidth: 2,
        marginTop: 20,
        width: 300,
        height: 150,
    },

    form_text: {
        color: 'white',
        fontFamily: fontFamily.Average,
        fontSize: fontSize.medium,
        // paddingTop: 5,
        // paddingBottom: 5,
        marginTop: 40,
    },
    form_input: {
        borderColor: 'transparent',
        borderBottomColor: 'white',
        borderWidth: 1,
        width: 300,
        // paddingBottom: 5,
    },
    loginBTN_Container: {
        display: 'flex',
        marginTop: 30,
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBTN: {
        backgroundColor: 'rgba(210, 76, 73, 0.47)',
        borderRadius: 9,
        borderColor: 'white',
        borderWidth: 1,
        width: 130,
        height: 40,

        alignItems: 'center',
        justifyContent: 'center',

    },
    loginBTN_text: {
        color: 'white',
        fontFamily: fontFamily.Average,
        fontSize: fontSize.medium,
    },

});

title = StyleSheet.create({
    container: {
        width: windowWidth - 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 150,
    },
    text: {
        // borderColor: 'green',
        // borderWidth: 2,
        flexDirection: 'column',
    },

    text_just: {
        // borderColor: 'yellow',
        // borderWidth: 2,
        width: 270,
        height: 100,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 20,
    },

    text_ust: {
        color: colorPalette.primaryColor,
        fontSize: fontSize.title,
        fontFamily: 'OrelegaOne',
        marginLeft: 10,
    },

    text_sayContainer: {
        // borderColor: 'red',
        // borderWidth: 2,
        width: 270,
        height: 70,
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },

    text_saying: {
        transform: [{ scaleY: -1 }],
        color: colorPalette.secondaryColor,
        fontSize: fontSize.title,
        fontFamily: 'OrelegaOne',

    },

    quoteFront: {
        position: 'absolute',
        top: 0,
        left: 30,
    },
    quoteBack: {
        position: 'absolute',
        bottom: 50,
        right: 40,
    },

});


styles = StyleSheet.create({
    loginForm: {
        marginTop: 70,
        // borderColor: 'blue',
        // borderWidth: 2,
        width: 350,
        height: 200,

        alignItems: 'center',
        // justifyContent: 'center',
    },

    main_container: {
        flex: 1,
        backgroundColor: colorPalette.backgroundColor,
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: '100%',
    },

    logo_container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
    },

});