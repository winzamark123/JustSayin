import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { colorPalette } from './theme';
import Icon from 'react-native-vector-icons/MaterialIcons';




function NavBar({ bgColor }) {
    const route = useRoute();
    const navigation = useNavigation();

    const getIconColor = (bgColor, pageName) => {
        if (route.name === pageName) {
            return '#D33F48';
        }
        return bgColor === colorPalette.yellowColor ? colorPalette.blackColor : colorPalette.whiteColor;
    }

    return (
        <View style={{ ...navBarStyles.background, backgroundColor: bgColor }}>
            <View style={navBarStyles.container}>
                <TouchableOpacity title="Home" onPress={() => navigation.navigate('HomePage')}>
                    <Icon name="home" size={40} color={getIconColor(bgColor, 'HomePage')}></Icon>
                </TouchableOpacity>
                <TouchableOpacity title="Friends" onPress={() => navigation.navigate('FriendsPage')}>
                    <Icon name="group" size={40} color={getIconColor(bgColor, 'FriendsPage')}></Icon>
                </TouchableOpacity>
                <TouchableOpacity title="Settings" onPress={() => navigation.navigate('SettingsPage')}>
                    <Icon name="settings" size={40} color={getIconColor(bgColor, 'SettingsPage')}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const navBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: `${colorPalette.yellowColor}`,

        // borderWidth: 1,
        // borderColor: 'black',
        width: windowWidth * 0.8,
    },
    background: {
        alignItems: 'center',
        // justifyContent: 'center',
        width: windowWidth,
        // backgroundColor: `${colorPalette.yellowColor}`,
        position: 'absolute',
        bottom: 0,
        padding: 20

    }
});


export default NavBar;