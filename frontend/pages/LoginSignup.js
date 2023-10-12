import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { colorPalette, fontSize } from "../components/theme";
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
                        <Image style={styles.ust} source={ustPNG} />
                    </View>
                    <Image style={styles.title_text_saying} source={SayingPNG} />
                </View>
                <Image style={styles.quoteBack} source={QuoteBackPNG}></Image>
            </View>


        </View >
    )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


styles = StyleSheet.create({
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

        marginTop: 130,
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

    title_text_saying: {
        width: 270,
        height: 70,
        resizeMode: 'contain',
        
        justifyContent: 'flex-end',
    },

    quoteFront: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    quoteBack: {
        position: 'absolute',
        bottom: 0,
        right: 0,
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