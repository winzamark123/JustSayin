import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { colorPalette, fontFamily, fontSize } from '../components/theme';
import JustSayinSVG from '../assets/LandingPage/JustSayin.svg';
export default function Landing({ navigation }) {
    return (
        <View style={landing.background}>
            <Text style={landing.Welcome}>Welcome to</Text>
            <JustSayinSVG />

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
        position: 'absolute',
        top: 100,
        left: 30,
        color: colorPalette.whiteColor,
        fontSize: 32,
        fontWeight: 600,
        fontFamily: fontFamily.AveriaSerifLibre,
    },
    JustSayinSVG: {
        position: 'absolute',
        top: 0,
        left: 30,
    },
})