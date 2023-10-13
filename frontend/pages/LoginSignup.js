import { StyleSheet, Text, TextInput, View, Image, Dimensions } from "react-native";
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
            <View style={styles.title}>
                {/* <Logo logoSize={100} /> */}
                <Image style={styles.quoteFront} source={QuoteFrontPNG} />
                <View style={styles.title_text}>
                    <View style={styles.title_text_just}>
                        <Image style={styles.J} source={JPNG} />
                        <Text style={styles.title_text_ust}>ust</Text>
                    </View>

                    <View style={styles.title_text_sayContainer}>
                        <Text style={styles.title_text_saying}>Sayin</Text>
                    </View>
                </View>
                <Image style={styles.quoteBack} source={QuoteBackPNG}></Image>
            </View>

            <View style={styles.loginForm}>
                    <Text style={styles.loginForm_text}>Log In</Text>
                    <View style={styles.loginForm_form}>
                        <Text style={styles.loginForm_form_text}>Email</Text>
                        <TextInput style={styles.loginForm_form_input}></TextInput>
                        <Text style={styles.loginForm_form_text}>Password</Text>
                        <TextInput style={styles.loginForm_form_input}></TextInput>
                    </View>
                </View>


        </View >
    )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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

    loginForm_text: {
        color: colorPalette.secondaryColor,
        fontSize: fontSize.large,
        fontFamily: fontFamily.AveriaSerifLibre,
        // fontWeight: '800',

    },

    loginForm_form: {
        borderColor: 'red',
        borderWidth: 2,
        width: 300,
        height: 150,

    },

    loginForm_form_text: {
        color: 'white',
        fontFamily: fontFamily.Average,
        fontSize: fontSize.medium,
    },

    loginForm_form_input: {
        borderBottomColor: 'white',
        borderWidth: 1,
        width: 300,
    },

    main_container: {
        flex: 1,
        backgroundColor: colorPalette.backgroundColor,
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: '100%',
    },

    title: {
        // borderColor: 'red',
        // borderWidth: 2,
        width: windowWidth - 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 150,
    },

    title_text: {
        // borderColor: 'green',
        // borderWidth: 2,
        flexDirection: 'column',
    },

    title_text_just: {
        // borderColor: 'yellow',
        // borderWidth: 2,
        width: 270,
        height: 100,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 20,
    },

    title_text_ust: {
        color: colorPalette.primaryColor,
        fontSize: fontSize.title,
        fontFamily: 'OrelegaOne',
        marginLeft: 10,
    },

    title_text_sayContainer: {
        // borderColor: 'red',
        // borderWidth: 2,
        width: 270,
        height: 70,
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },

    title_text_saying: {
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

    title_text: {

    },

    logo_container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
    },

});