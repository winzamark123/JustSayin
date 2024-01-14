import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { colorPalette, fontFamily, normalize } from '../components/theme';
import JustSayinPNG from '../assets/LandingPage/JustSayin.png';
import SafeAreaWrapper from '../components/SafeAreaWrapper';



export default function Landing({ navigation }) {

    const goToLogin = () => {
        navigation.navigate("LoginPage");
    }

    return (
        <SafeAreaWrapper color={colorPalette.mainColor}>
            <View style={landing.background}>
                <View style={landing.container}>
                    <Text style={landing.Welcome}>Welcome to</Text>
                    <Image source={JustSayinPNG} style={landing.JustSayinPNG} resizeMode='contain' />
                    <Text style={landing.body}>Your Quote of the Day</Text>
                </View>
                <TouchableOpacity style={landing.BTN} onPress={() => goToLogin()}></TouchableOpacity>
            </View>
        </SafeAreaWrapper>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const landing = StyleSheet.create({
    container: {
        top: 56,
        left: 30,
        justifyContent: 'center',

    },
    background: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: colorPalette.mainColor,
    },
    Welcome: {
        position: 'relative',
        fontSize: normalize(28),
        color: colorPalette.whiteColor,
        fontFamily: fontFamily.PoppinsBold,

        // borderWidth: 1,
        // borderColor: colorPalette.whiteColor,
    },
    JustSayinPNG: {
        position: 'relative',
        width: windowWidth * 0.85,
        // borderWidth: 1,
        // borderColor: colorPalette.whiteColor,

    },
    body: {
        position: 'relative',
        fontSize: normalize(24),
        color: colorPalette.whiteColor,
        fontFamily: fontFamily.PoppinsBold,
        // borderWidth: 1,
        // borderColor: colorPalette.whiteColor,
    },
    BTN: {
        position: 'absolute',
        bottom: 100,
        right: 30,
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: colorPalette.forestGreenColor,
        borderColor: colorPalette.blackColor,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,  // Horizontal shadow
            height: 2, // Vertical shadow
        },
        shadowOpacity: 0.25, // The opacity of the shadow
        shadowRadius: 3.84,
    }
})