import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { colorPalette, fontFamily, fontSize } from '../components/theme';
import JustSayinPNG from '../assets/LandingPage/JustSayin.png';




export default function Landing({ navigation }) {

    const goToLogin = () => {
        navigation.navigate("LoginPage");
    }

    return (
        <View style={landing.background}>
            <Text style={landing.Welcome}>Welcome to</Text>
            <Image source={JustSayinPNG} style={landing.JustSayinPNG} resizeMode='contain' />
            <Text style={landing.body}>Your Quote of the Day</Text>
            <TouchableOpacity style={landing.BTN} onPress={() => goToLogin()}></TouchableOpacity>

        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const landing = StyleSheet.create({
    background: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: colorPalette.mainColor,
    },
    Welcome: {
        position: 'relative',
        top: 100,
        left: 30,
        fontSize: 32,
        color: colorPalette.whiteColor,
        fontFamily: fontFamily.Poppins,
        // borderWidth: 1,
        // borderColor: colorPalette.whiteColor,
    },
    JustSayinPNG: {
        position: 'relative',
        top: 100,
        left: 30,
        // borderWidth: 1,
        // borderColor: colorPalette.whiteColor,
    },
    body: {
        position: 'relative',
        top: 100,
        left: 30,
        fontSize: 20,
        color: colorPalette.whiteColor,
        fontFamily: fontFamily.Poppins,
        // borderWidth: 1,
        // borderColor: colorPalette.whiteColor,
    },
    BTN: {
        position: 'absolute',
        top: 750,
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