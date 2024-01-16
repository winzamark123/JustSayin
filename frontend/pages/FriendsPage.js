import { useUser } from '../context/UserContext';
import { addFriendToBackend } from '../api/userAPI';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { colorPalette, fontFamily, normalize } from '../components/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from '../components/navBar';

export default function Friends() {
    const { user, profilePic, updateProfilePic } = useUser();
    return (
        <SafeAreaWrapper color={colorPalette.yellowColor}>
            <View style={{ backgroundColor: colorPalette.yellowColor, paddingLeft: normalize(30), paddingRight: normalize(30), gap: normalize(12) }}>
                <View style={Top.container}>
                    <Image source={profilePic} style={Top.userProfileImage}></Image>
                    <View style={Top.textContainer}>
                        <Text style={{ fontFamily: fontFamily.Poppins }}>Have a nice day</Text>
                        <Text style={{ fontFamily: fontFamily.PoppinsSemiBold, fontSize: normalize(20) }}>{user.username}</Text>
                    </View>
                </View>
                <View style={title.container}>
                    <Text style={title.text}>Friend's Quote</Text>
                    <TouchableOpacity style={title.button}>
                        <Icon name="add" size={30} color="black"></Icon>
                    </TouchableOpacity>
                </View>
            </View>

            <NavBar />
        </SafeAreaWrapper>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Top = StyleSheet.create({
    textContainer: {
        marginLeft: normalize(12),
        flexDirection: 'column',
    },
    container: {
        marginTop: normalize(30),
        flexDirection: 'row',
        backgroundColor: '#F0F0D1',
        width: windowWidth,

        // borderWidth: 1,
        // borderColor: 'black',
    },
    text: {

    },
    userProfileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
});

const title = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: normalize(24),
        color: colorPalette.blackColor,
    },
    button: {
        width: normalize(37),
        height: normalize(37),
        backgroundColor: colorPalette.forestGreenColor,
        borderRadius: normalize(8),

        alignItems: 'center',
        justifyContent: 'center',
    }
});