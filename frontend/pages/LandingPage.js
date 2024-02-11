import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text, Animated } from 'react-native';
import { useState, useRef } from 'react';
import { colorPalette, fontFamily, normalize } from '../components/theme';
import JustSayinPNG from '../assets/LandingPage/JustSayin.png';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Onboarding from 'react-native-onboarding-swiper';

export default function Landing({ navigation }) {
    const [pageIndex, setPageIndex] = useState(0);

    // Use useRef instead of useState for the animated value
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0


    // ... (rest of your functions)
const goToLogin = () => {
        navigation.navigate("LoginPage");
    }

    const CustomDot = ({ selected }) => {
        return (
            <View
                style={[
                    pageDots.dot,
                    selected ? pageDots.activeDot : pageDots.inactiveDot,
                ]}
            />
        );
    };

    return (
        <SafeAreaWrapper color={colorPalette.mainColor} style={{ padding: normalize(30) }}>
            {/* <View style={landing.background}> */}
            <Onboarding
                // pageIndexCallback={getPageIndex}
                DotComponent={CustomDot}
                bottomBarColor='transparent'
                bottomBarHighlight={false}
                showSkip={true}
                onSkip={goToLogin}
                showNext={false}
                onDone={goToLogin}
                // DoneButtonComponent={doneButton}
                containerStyles={{ justifyContent: 'flex-start', alignItems: 'center', padding: normalize(30), }}
                pages={[
                    {
                        backgroundColor: colorPalette.mainColor,
                        image: (
                            <View style={{ top: normalize(30) }}>
                                <Text style={landing.Welcome}>Welcome to</Text>
                                <Image source={JustSayinPNG} style={landing.JustSayinPNG} resizeMode='contain' />
                                <Text style={landing.body}>Your Quote of the Day</Text>
                            </View>
                        ),
                    },
                    {
                        backgroundColor: colorPalette.mainColor,
                        image: (
                            <View style={{ top: normalize(150), justifyContent: "center", alignItems: "center" }}>
                                <Image source={require('../assets/onBoardingPage/onboarding_1.png')} resizeMode='contain' style={landing.image}/>
                                <Text style={landing.body}>Choose your own quote categories</Text>
                            </View>
                        )
                    },
                    {
                        backgroundColor: colorPalette.mainColor,
                        image: (
                            <View style={{ top: normalize(150), justifyContent: "center", alignItems: "center" }}>
                                <Image source={require('../assets/onBoardingPage/onboarding_bell.png')} resizeMode='contain' style={landing.image}/>
                                <Text style={landing.body}>Allow Notifications for our Widget to work</Text>
                            </View>
                        )
                    },
                    {
                        backgroundColor: colorPalette.mainColor,
                        image: (
                            <View style={{ top: normalize(150), justifyContent: "center", alignItems: "center" }}>
                                <Image source={require('../assets/onBoardingPage/onboarding_2.png')} resizeMode='contain' style={landing.image}/>
                                <Text style={landing.body}>Daily Quote generated on your Widgets!</Text>
                            </View>
                        )
                    },
                    {
                        backgroundColor: colorPalette.mainColor,
                        image: (
                            <View style={{ top: normalize(150), justifyContent: "center", alignItems: "center" }}>
                                <Image source={require('../assets/onBoardingPage/onboarding_3.png')} resizeMode='contain' style={landing.image}/>
                                <Text style={landing.body}>Add friends to view theirs!</Text>
                            </View>
                        )
                    },
                ]}
            />
            <View>
            </View>
            {/* <TouchableOpacity style={landing.BTN} onPress={() => goToLogin()}></TouchableOpacity> */}
            {/* </View> */}
        </SafeAreaWrapper>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pageDots = StyleSheet.create({
    dot: {
        width: 10,  // Width of the dot
        height: 10,  // Height of the dot
        borderRadius: 5,  // Make it circular
        marginHorizontal: 6,  // Margin between dots
    },
    activeDot: {
        backgroundColor: colorPalette.forestGreenColor,  // Active dot color
    },
    inactiveDot: {
        backgroundColor: 'white',  // Inactive dot color
    },
    // ... other styles ...
});

const landing = StyleSheet.create({
    container: {
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
    image: {
        width: normalize(250),
        height: normalize(250),
    },
    body: {
        position: 'relative',
        fontSize: normalize(20),
        color: colorPalette.whiteColor,
        fontFamily: fontFamily.PoppinsBold,
        textAlign: 'center',
        marginTop: normalize(30),
        // borderWidth: 1,
        // borderColor: colorPalette.whiteColor,
    },
    BTN: {
        padding: normalize(20),
        backgroundColor: colorPalette.forestGreenColor,
        borderTopLeftRadius: normalize(100),
        borderBottomLeftRadius: normalize(100),
    }
})