import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { colorPalette, fontFamily, normalize } from '../components/theme';
import JustSayinPNG from '../assets/LandingPage/JustSayin.png';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';



import group1 from '../assets/onBoardingPage/pageIndex/group1.png';
import group2 from '../assets/onBoardingPage/pageIndex/group2.png';
import group3 from '../assets/onBoardingPage/pageIndex/group3.png';

export default function Landing({ navigation }) {
    const [pageIndex, setPageIndex] = useState(0);

    const goToLogin = () => {
        navigation.navigate("LoginPage");
    }

    const getPageIndex = (newPageIndex) => {
        console.log(pageIndex);
        setPageIndex(newPageIndex);
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

    const Next = ({ isLight, ...props }) => (
        <TouchableOpacity
            style={landing.BTN}
            {...props}
        />
    );


    return (
        <SafeAreaWrapper color={colorPalette.mainColor}>
            {/* <View style={landing.background}> */}
            <Onboarding
                pageIndexCallback={getPageIndex}
                DotComponent={CustomDot}
                bottomBarColor='transparent'
                bottomBarHighlight={false}
                NextButtonComponent={Next}
                containerStyles={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: normalize(130) }}
                pages={[
                    {
                        backgroundColor: colorPalette.mainColor,
                        image: (
                            <View style={landing.container}>
                                <Text style={landing.Welcome}>Welcome to</Text>
                                <Image source={JustSayinPNG} style={landing.JustSayinPNG} resizeMode='contain' />
                                <Text style={landing.body}>Your Quote of the Day</Text>
                            </View>
                        )
                    },
                    {
                        backgroundColor: colorPalette.mainColor,
                        image: (
                            <View>
                                <Image source={require('../assets/onBoardingPage/onboarding_1.png')} resizeMode='contain' />
                                <Text style={landing.body}>Choose your own quote categories</Text>
                            </View>
                        )
                    },
                    {
                        backgroundColor: colorPalette.mainColor,
                        image: <Image source={require('../assets/onBoardingPage/onboarding_2.png')} />,
                        title: 'Daily quote generated on your desktop',
                    },
                    {
                        backgroundColor: colorPalette.mainColor,
                        image: <Image source={require('../assets/onBoardingPage/onboarding_3.png')} />,
                        title: 'Add friends to view theirs!',
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
    body: {
        position: 'relative',
        fontSize: normalize(24),
        color: colorPalette.whiteColor,
        fontFamily: fontFamily.PoppinsBold,
        // borderWidth: 1,
        // borderColor: colorPalette.whiteColor,
    },
    BTN: {
        // position: 'absolute',
        // bottom: 100,
        // right: 30,
        width: normalize(80),
        height: normalize(80),
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